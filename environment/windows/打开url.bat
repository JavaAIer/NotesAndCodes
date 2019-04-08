taskkill /f /im iexplore.exe 
start "" "C:\Program Files\Internet Explorer\iexplore.exe" http://www.csdn.net
timeout /T 60 /NOBREAK
taskkill /f /im iexplore.exe 