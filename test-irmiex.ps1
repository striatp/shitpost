function Get-StringChecksum {
    <#
    .SYNOPSIS
        Computes the SHA256 checksum of a given string.
    .DESCRIPTION
        This function takes a string, encodes it as UTF8 bytes, computes the SHA256 hash,
        and returns it as a lowercase hexadecimal string.
    .PARAMETER InputString
        The string content for which to compute the checksum.
    .OUTPUTS
        [System.String] - The SHA256 checksum in hex format.
    #>

    [CmdletBinding()]
    [OutputType([System.String])]
    param (
        [Parameter(Mandatory = $true)]
        [string] $InputString
    )

    try {
        $sha256 = [System.Security.Cryptography.SHA256]::Create()
        $bytes  = [System.Text.Encoding]::UTF8.GetBytes($InputString)
        $hash   = $sha256.ComputeHash($bytes)
        return ([System.BitConverter]::ToString($hash) -replace '-', '').ToLower()
    } catch {
        throw "[ERROR] ChecksumException - Failed to compute hash.`n[ERROR] $($_.Exception.Message)"
    }
}

