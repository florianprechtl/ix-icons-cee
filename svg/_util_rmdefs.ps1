# Get the current directory path
$currentDir = Get-Location

$svgFiles = Get-ChildItem -Path $currentDir -Recurse -Include *.svg

# Loop through each SVG file and remove the first occurrence of the <defs> tag and its contents
foreach ($svgFile in $svgFiles) {
    # Read the contents of the SVG file into a string
    $svgContent = Get-Content $svgFile.FullName -Raw

    # Find the starting index of the first <defs> tag
    $defsStartIndex = $svgContent.IndexOf("<defs>")

    # If a <defs> tag was found, find the index of its closing tag
    if ($defsStartIndex -ge 0) {
        $defsEndIndex = $svgContent.IndexOf("</defs>", $defsStartIndex) + "</defs>".Length

        # Remove the <defs> tag and its contents
        $svgContent = $svgContent.Remove($defsStartIndex, $defsEndIndex - $defsStartIndex)

        # Write the modified SVG content back to the file
        Set-Content -Path $svgFile.FullName -Value $svgContent
    }
}