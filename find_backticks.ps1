$i = 1
Get-Content -Path 'C:\Users\CLIENTE2024\.gemini\antigravity\scratch\matias-brand\js\app.js' | ForEach-Object {
    if ($_.Contains([char]96)) {
        Write-Output ($i.ToString() + ": " + $_)
    }
    $i++
}
