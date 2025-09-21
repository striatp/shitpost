import { execSync } from "node:child_process";
import { homedir, platform } from "node:os";
import { basename, join } from "node:path";
import {
  existsSync,
  mkdirSync,
  copyFileSync,
  readFileSync,
  writeFileSync,
  accessSync,
  constants
} from "node:fs";

import { LoggerService } from "@services/logger.service";

/**
 * This abstract class provides methods for managing the 'PATH' environment variable.
 */
abstract class BasePathManager {
  /** Whether to enable debug logging. */
  protected Debug: boolean = false;

  abstract Add(dir: string): void;
  abstract Remove(dir: string): void;
  abstract Exists(dir: string): boolean;
}

/**
 * This class provides methods for managing the 'PATH' environment variable on Windows.
 */
class WindowsPathManager extends BasePathManager {

  /** Whether to enable debug logging. */
  protected Debug: boolean = false;

  /**
   * This constructor initializes the path manager with the specified debug flag.
   * 
   * @param debug Whether to enable debug logging.
   */
  constructor(debug: boolean = false) {
    super();
    this.Debug = debug;
  }

  /**
   * This method prepends a new directory path to the user's 'PATH' environment variable.
   * 
   * @param directory The new path to prepend in the user 'PATH' environment variable.
   */
  public Add(directory: string): void {
    try {
      let CurrentPath: string | null = this.GetCurrentPath();
      let PathArray: Array<string> = CurrentPath ? CurrentPath.split(";") : [];

      if (PathArray.includes(directory)) {
        LoggerService.Info("Directory is already in 'PATH'. Skipped the environment variable setup.");
        return;
      }

      let NewPath: string = CurrentPath ? `${directory};${CurrentPath}` : directory;

      execSync(`reg add "HKCU\\Environment" /v Path /t REG_EXPAND_SZ /d "${NewPath}" /f`);

      if (this.Debug) { LoggerService.Debug(`Windows user 'PATH' environment variable was successfully updated: ${NewPath}`); }
      LoggerService.Success("Windows user 'PATH' environment variable was successfully updated.");
      LoggerService.Success("Restart your terminal to apply changes.");

    } catch (error) {
      LoggerService.Error(`Windows user 'PATH' setup failed: ${(error as Error).message}`);
    }
  }

  /**
   * This method removes a directory path from the user's 'PATH' environment variable.
   * 
   * @param directory The path to remove from the user 'PATH' environment variable.
   */
  public Remove(directory: string): void {
    try {
      let CurrentPath: string | null = this.GetCurrentPath();
      if (!CurrentPath) { return; }

      let PathArray: Array<string> = CurrentPath.split(";");
      let NewPath: string = PathArray.filter(path => path !== directory).join(";");

      execSync(`reg add "HKCU\\Environment" /v Path /t REG_EXPAND_SZ /d "${NewPath}" /f`);

      if (this.Debug) { LoggerService.Debug(`Windows user 'PATH' environment variable was successfully updated: ${NewPath}`); }
      LoggerService.Success("Windows user 'PATH' environment variable was successfully updated.");
      LoggerService.Success("Restart your terminal to apply changes.");

    } catch (error) {
      LoggerService.Error(`Windows user 'PATH' setup failed: ${(error as Error).message}`);
    }
  }

  /**
   * This method checks if a directory path exists in the user's 'PATH' environment variable.
   * 
   * @param directory The path to check in the user 'PATH' environment variable.
   * @returns A boolean indicating whether the directory path exists in the user 'PATH' environment variable.
   */
  public Exists(directory: string): boolean {
    let CurrentPath: string | null = this.GetCurrentPath();
    return (CurrentPath || '')?.split(";").some(path => path?.toLowerCase() === directory.toLowerCase());
  }

  /**
   * This private method retrieves the current value of the 'PATH' environment variable from the Windows registry.
   * 
   * @returns The current value of the 'PATH' environment variable as a string, or null if it cannot be retrieved.
   */
  private GetCurrentPath(): string | null {
    try {
      let Output: string = execSync(
        'reg query "HKCU\\Environment" /v PATH', {
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "ignore"]
      }).toString();

      let Match: RegExpMatchArray | null = Output.match(/(?:PATH|Path)\s+REG_\w+\s+(.*)/i);

      return Match ? Match[1].trim() : null;

    } catch {
      return process.env.PATH || null;
    }
  }
}

/**
 * This class provides methods for managing the 'PATH' environment variable on Unix-based systems.
 */
class UnixPathManager extends BasePathManager {

  /** Whether to enable debug logging. */
  protected Debug: boolean = false;

  /**
   * This constructor initializes the path manager with the specified debug flag.
   * 
   * @param debug Whether to enable debug logging.
   */
  constructor(debug: boolean = false) {
    super();
    this.Debug = debug;
  }

  /**
   * This method prepends a new directory path to the user's 'PATH' environment variable.
   * 
   * @param directory The new path to prepend in the user 'PATH' environment variable.
   */
  public Add(directory: string): void {
    try {
      let RCFilePath: string = this.GetRCFilePath();
      let RCFileName: string = basename(RCFilePath);

      let Content: string = existsSync(RCFilePath) ? readFileSync(RCFilePath, { encoding: "utf-8" }) : "";
      Content = Content.replace(/# forgecli[\s\S]*?# forgecli end\n?/g, '');

      // Backup the RC file in case of any issues
      this.BackupRCFile(RCFilePath);

      let ExportLine: string = this.GetExportLine(directory);

      if (!this.CanWriteFile(RCFilePath)) {
        LoggerService.Error(`Cannot write to ${RCFilePath}. Check permissions.`);
        return;
      }

      writeFileSync(RCFilePath, Content + ExportLine);

      if (this.Debug) { LoggerService.Debug(`Unix user 'PATH' environment variable was successfully updated: ${ExportLine}`); }
      LoggerService.Success(`Updated ${RCFileName} successfully`);

      if (!this.Exists(directory)) {
        LoggerService.Warn(`Run 'source ~/${RCFileName}' or restart your shell to apply changes`);
      }

    } catch (error) {
      LoggerService.Error(`Unix user 'PATH' setup failed: ${(error as Error).message}`);
    }
  }

  /**
   * This method removes a directory path from the user's 'PATH' environment variable.
   * 
   * @param directory The path to remove from the user 'PATH' environment variable.
   */
  public Remove(directory: string): void {
    try {
      let RCFilePath: string = this.GetRCFilePath();
      if (!existsSync(RCFilePath)) { return; }

      let Content: string = readFileSync(RCFilePath, { encoding: "utf-8" });
      let CleanedContent: string = Content.replace(
        /# forgecli[\s\S]*?# forgecli end\n?/g,
        (block) => block.includes(directory) ? "" : block
      );

      if (!this.CanWriteFile(RCFilePath)) {
        LoggerService.Error(`Cannot write to ${RCFilePath}. Check permissions.`);
        return;
      }

      writeFileSync(RCFilePath, CleanedContent);

      if (this.Debug) { LoggerService.Debug(`Unix user 'PATH' environment variable was successfully updated.`); }
      LoggerService.Success(`Updated ${RCFilePath} successfully`);

    } catch (error) {
      LoggerService.Error(`Unix user 'PATH' removal failed: ${(error as Error).message}`);
    }
  }

  /**
   * This method checks if a directory path exists in the user's 'PATH' environment variable.
   * 
   * @param directory The path to check in the user 'PATH' environment variable.
   * @returns A boolean indicating whether the directory path exists in the user 'PATH' environment variable.
   */
  public Exists(directory: string): boolean {
    let NormalizedDirectory: string = directory.replace(/\/+$/, "").toLowerCase();
    return (process.env.PATH || '')
      .split(":")
      .some(path => path.replace(/\/+$/, "").toLowerCase() === NormalizedDirectory);
  }

  /**
   * This private method retrieves the path to the shell configuration file.
   * 
   * @returns The path to the shell configuration file.
   */
  private GetRCFilePath(): string {
    let Home: string = homedir();
    let Shell: string = basename(process.env.SHELL || '/bin/sh');
    if (!process.env.SHELL) { LoggerService.Warn("'SHELL' variable not set, defaulting to '/bin/sh'."); }

    let IsMacOS: boolean = platform() === 'darwin';

    let RCFilePath: string;

    if (Shell.includes('zsh')) { RCFilePath = join(Home, '.zshrc'); }
    else if (Shell.includes('bash')) { RCFilePath = IsMacOS ? join(Home, '.bash_profile') : join(Home, '.bashrc'); }
    else if (Shell.includes('fish')) { var FishDirPath: string = join(Home, '.config', 'fish'); mkdirSync(FishDirPath, { recursive: true }); RCFilePath = join(FishDirPath, 'config.fish'); }
    else if (Shell.includes('tcsh')) { RCFilePath = join(Home, '.tcshrc'); }
    else { RCFilePath = join(Home, '.profile'); }

    if (!existsSync(RCFilePath)) {
      if (!this.CanWriteFile(RCFilePath)) {
        LoggerService.Error(`Cannot write to ${RCFilePath}. Check permissions.`);
        return '';
      }
      writeFileSync(RCFilePath, '');
      if (this.Debug) { LoggerService.Debug(`Created ${RCFilePath}.`); }
    }

    return RCFilePath;
  }

  /**
   * This private method generates the export line for the given directory path.
   * 
   * @param directory The directory path to generate the export line for.
   * @returns The export line for the given directory path.
   */
  private GetExportLine(directory: string): string {
    let Shell: string = basename(process.env.SHELL || '/bin/sh');

    if (Shell.includes('fish')) {
      return `# forgecli\nset -gx PATH "${directory}" $PATH\n# forgecli end\n`;
    } else if (Shell.includes('tcsh')) {
      return `# forgecli\nsetenv PATH "${directory}:$PATH"\n# forgecli end\n`;
    } else {
      // bash, zsh, and other POSIX shells (works on Linux + macOS)
      return `# forgecli\nexport PATH="${directory}:$PATH"\n# forgecli end\n`;
    }
  }

  /**
   * This private method creates a backup of the RC file.
   * 
   * @param RCFilePath The path to the RC file to backup.
   * @returns The path to the backup file.
   */
  private BackupRCFile(RCFilePath: string): string {
    try {
      let BackupPath: string = join(homedir(), ".forge", "backups");
      mkdirSync(BackupPath, { recursive: true });

      let Timestamp: string = new Date().toISOString().replace(/[:.]/g, "-");
      let FileName: string = basename(RCFilePath) + "." + Timestamp + ".backup";

      copyFileSync(RCFilePath, join(BackupPath, FileName));
      if (this.Debug) { LoggerService.Debug(`Backup created at ${join(BackupPath, FileName)}`); }

      return join(BackupPath, FileName);

    } catch {
      return "";
    }
  }

  private CanWriteFile(filePath: string): boolean {
    try {
      let Dir: string = existsSync(filePath) ? filePath : join(filePath, "..");
      accessSync(Dir, constants.W_OK);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * This class provides a factory method for creating a path manager instance.
 */
class PathManagerFactory {
  /** This static method creates a path manager instance based on the platform. */
  static create(debug: boolean = false): BasePathManager {
    return platform() === "win32"
      ? new WindowsPathManager(debug)
      : new UnixPathManager(debug);
  }
}

export {
  WindowsPathManager,
  UnixPathManager,
  PathManagerFactory
};
