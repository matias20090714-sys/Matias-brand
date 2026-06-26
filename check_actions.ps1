$token = (Get-Content github_token.txt).Trim()
$headers = @{
    Authorization = "Bearer $token"
    Accept = "application/vnd.github.v3+json"
    "User-Agent" = "Antigravity-Sync"
}
try {
    $res = Invoke-RestMethod -Uri "https://api.github.com/repos/matias20090714-sys/Matias-brand/actions/runs" -Headers $headers
    $runs = $res.workflow_runs | Select-Object -First 5
    $runs | Format-Table id, name, status, conclusion, created_at
} catch {
    Write-Error "Error: $_"
}
