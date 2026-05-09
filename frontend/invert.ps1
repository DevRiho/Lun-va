Add-Type -AssemblyName System.Drawing
$path = "src\app\icon.png"
$dest = "src\app\icon_white.png"

$img = [System.Drawing.Bitmap]::FromFile($path)
$newImg = New-Object System.Drawing.Bitmap($img.Width, $img.Height)

for ($y = 0; $y -lt $img.Height; $y++) {
    for ($x = 0; $x -lt $img.Width; $x++) {
        $pixel = $img.GetPixel($x, $y)
        # Invert color, keep alpha
        $newColor = [System.Drawing.Color]::FromArgb($pixel.A, 255 - $pixel.R, 255 - $pixel.G, 255 - $pixel.B)
        $newImg.SetPixel($x, $y, $newColor)
    }
}

$newImg.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
$newImg.Dispose()
