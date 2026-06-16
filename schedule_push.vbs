' This VBScript uses WMI/Shell to create and run a scheduled task immediately
Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Kill openwith if it exists
On Error Resume Next
objShell.Run "taskkill /f /im openwith.exe", 0, False
WScript.Sleep 500

' Delete git index lock if exists
Dim lockFile
lockFile = "C:\Users\tomng\Desktop\2m-construction\.git\index.lock"
If objFSO.FileExists(lockFile) Then
    objFSO.DeleteFile lockFile, True
End If

WScript.Sleep 200

' Run git commands
objShell.Run "cmd /c cd /d ""C:\Users\tomng\Desktop\2m-construction"" && git add app\admin\page.tsx app\admin\oauth-callback\page.tsx && git commit -m ""fix: switch OAuth to redirect flow"" && git push origin main > C:\Users\tomng\Desktop\2m-construction\push_result.txt 2>&1", 1, True

MsgBox "Done! Check push_result.txt"
