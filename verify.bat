@echo off
setlocal

cd /d "%~dp0"

set "NO_PAUSE="
if /i "%~1"=="--no-pause" set "NO_PAUSE=1"

set "EXIT_CODE=0"

echo [verify.bat] repo: %CD%

if not exist node_modules (
  echo [verify.bat] node_modules not found, running npm install...
  call npm.cmd install
  if errorlevel 1 (
    set "EXIT_CODE=%ERRORLEVEL%"
    goto finish
  )
)

echo [verify.bat] running npm run verify
call npm.cmd run verify
if errorlevel 1 (
  set "EXIT_CODE=%ERRORLEVEL%"
  goto finish
)

echo [verify.bat] success: npm run verify completed successfully.

:finish
if not "%EXIT_CODE%"=="0" (
  echo [verify.bat] failed with exit code %EXIT_CODE%.
)

if not defined NO_PAUSE (
  echo.
  pause
)

exit /b %EXIT_CODE%
