' Dismiss openwith dialog and run push.bat
Set objShell = CreateObject("WScript.Shell")

' Try to close "Open With" dialog by sending Escape
On Error Resume Next
objShell.AppActivate "Open With"
WScript.Sleep 200
objShell.SendKeys "{ESC}"
WScript.Sleep 500

' Now run push.bat
objShell.Run "cmd /c ""C:\Users\tomng\Desktop\2m-construction\push.bat""", 1, True
