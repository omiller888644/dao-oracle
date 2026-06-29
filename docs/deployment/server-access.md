# Dao Oracle Server Access Record

Last updated: 2026-06-29

## Cloudzy VPS

- VPS ID: `7539d14e-f973-4bf7-bd96-71965b9b734a`
- Hostname: `windows-LosAngeles-4gb`
- IPv4: `45.61.163.184`
- IPv6: `2602:fa59:13:1ea::1`
- Region: Los Angeles, United States
- Operating system: Windows Server 2022
- Plan noted in project docs: 2 vCPU / 4GB RAM / 120GB / 5TB
- Admin username: `Administrator`
- RDP port: `3389`
- SSH port: `22`
- SSH status: enabled and reachable from local machine

## Security Note

Do not store the server password in this repository, project documents, or GitHub.
Keep it in the Cloudzy dashboard or a private password manager.

After deployment access is no longer needed, rotate the Administrator password or
create a separate deployment user with limited permissions.

## Current Deployment Use

- Purpose: test deployment for the Dao Oracle web app before the production domain is purchased.
- Domain: not purchased yet.
- Temporary access target after deployment: `http://45.61.163.184:3000`
- HTTPS: to be configured after a domain is purchased and DNS points to this server.

## Current Web Service

- Deployment path: `C:\Sites\dao-oracle`
- App path: `C:\Sites\dao-oracle\apps\web`
- Git branch: `codex/full-stack-platform`
- Node.js: installed through Chocolatey
- Git: installed through Chocolatey
- Process manager: Windows service via NSSM
- Service name: `DaoOracleWeb`
- App port: `3000`
- Firewall: Windows inbound TCP `3000` allowed
- Last verified: 2026-06-29
- Verified URLs:
  - `http://45.61.163.184:3000/`
  - `http://45.61.163.184:3000/reading`
  - `http://45.61.163.184:3000/reading/transition`
  - `http://45.61.163.184:3000/reading/cast`
  - `http://45.61.163.184:3000/reading/result/demo`
