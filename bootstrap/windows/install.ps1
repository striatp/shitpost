<#
.SYNOPSIS
    Dock Installer for Windows (PowerShell 7+ required)

.DESCRIPTION
    Downloads the latest release of Dock from GitHub, installs it into $env:USERPROFILE\.dock,
    sets environment variables, and updates PATH.

.NOTES
    Author: Dock Project
#>

# -------------------------------
# 1. Preflight Check
# -------------------------------
if ($PSVersionTable.PSVersion.Major -lt 7) {
    Write-Host "[DOCK] PowerShell 7 or later is required. Please install PowerShell 7+ from https://aka.ms/powershell" -ForegroundColor Red
    exit 1
}

Write-Host "[DOCK] Installing Dock..." -ForegroundColor Cyan
