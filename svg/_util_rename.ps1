# Get the current directory path
$currentDir = Get-Location

# Get all the files in the current directory
$files = Get-ChildItem -Path $currentDir | Where-Object {($_.Name -notlike "_util_*")}

# Loop through each file and rename it
foreach ($file in $files) {
    if ($file.Name -notlike "flo-*") {
        # Construct the new file name with "flo-" prefix and lowercase extension
        $newName = "flo-" + $file.BaseName.ToLower() + $file.Extension.ToLower()
        $newName = $newName -replace "_", "-"

        # Rename the file
        Rename-Item -Path $file.FullName -NewName $newName
    }
}