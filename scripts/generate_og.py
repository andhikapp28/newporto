import os
import math
from PIL import Image, ImageDraw, ImageFont

def create_og_image(output_path):
    width = 1200
    height = 630

    # 1. Base image with dark retro workstation background
    img = Image.new("RGBA", (width, height), (11, 17, 32, 255)) # #0b1120
    draw = ImageDraw.Draw(img)

    # Gradient background: #070b14 -> #0f172a -> #0a0f1d
    for y in range(height):
        ratio = y / height
        # Smooth curve
        r = int(7 + 10 * math.sin(ratio * math.pi))
        g = int(11 + 14 * math.sin(ratio * math.pi))
        b = int(20 + 26 * math.sin(ratio * math.pi))
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # Ambient radial glow behind the center
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    center_x, center_y = width // 2, height // 2 - 20
    max_radius = 450
    for rad in range(max_radius, 0, -10):
        alpha = int(38 * (1 - rad / max_radius))
        glow_draw.ellipse(
            [center_x - rad * 1.4, center_y - rad, center_x + rad * 1.4, center_y + rad],
            fill=(24, 75, 170, alpha)
        )
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)

    # Subtle retro workstation dot grid
    grid_spacing = 28
    for x in range(0, width, grid_spacing):
        for y in range(0, height, grid_spacing):
            draw.point((x, y), fill=(30, 48, 80, 80))

    # CRT scanlines across the whole image (very subtle)
    scanline_overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    scan_draw = ImageDraw.Draw(scanline_overlay)
    for y in range(0, height, 4):
        scan_draw.line([(0, y), (width, y)], fill=(0, 0, 0, 22), width=1)
    img = Image.alpha_composite(img, scanline_overlay)
    draw = ImageDraw.Draw(img)

    # Fonts
    def get_font(name, size, fallback="arial.ttf"):
        paths = [
            f"C:/Windows/Fonts/{name}",
            f"C:/Windows/Fonts/{fallback}",
            name,
            fallback
        ]
        for p in paths:
            if os.path.exists(p):
                try:
                    return ImageFont.truetype(p, size)
                except Exception:
                    pass
        return ImageFont.load_default()

    font_title = get_font("trebucbd.ttf", 52, "segoeuib.ttf")
    font_subtitle = get_font("segoeui.ttf", 24, "tahoma.ttf")
    font_badge = get_font("segoeuib.ttf", 20, "tahomabd.ttf")
    font_mono = get_font("consola.ttf", 15, "arial.ttf")
    font_mono_bold = get_font("consolab.ttf", 15, "arialbd.ttf")
    font_tag = get_font("segoeui.ttf", 16, "tahoma.ttf")
    font_tag_bold = get_font("segoeuib.ttf", 16, "tahomabd.ttf")
    font_xp_title = get_font("trebucbd.ttf", 15, "tahomabd.ttf")
    font_status = get_font("consola.ttf", 14, "tahoma.ttf")

    # 2. Draw Retro Windows XP Window Card
    # Dimensions:
    wx0, wy0 = 60, 45
    wx1, wy1 = 1140, 585
    radius = 12

    # Window Drop Shadow
    shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    for i in range(16, 0, -2):
        alpha = int(140 * (1 - i / 16))
        s_draw.rounded_rectangle(
            [wx0 - i, wy0 - i + 8, wx1 + i, wy1 + i + 8],
            radius=radius + i // 2,
            fill=(0, 0, 0, alpha)
        )
    img = Image.alpha_composite(img, shadow)
    draw = ImageDraw.Draw(img)

    # Window Border & Background
    # Main outer border in Luna Blue
    draw.rounded_rectangle([wx0, wy0, wx1, wy1], radius=radius, fill=(13, 22, 41, 250), outline=(0, 85, 234, 255), width=3)

    # Window Titlebar (Luna Gradient: #0058ee -> #3593ff -> #0058ee)
    titlebar_h = 42
    titlebar_img = Image.new("RGBA", (wx1 - wx0, titlebar_h), (0, 0, 0, 0))
    tb_draw = ImageDraw.Draw(titlebar_img)

    tw = wx1 - wx0
    for x in range(tw):
        # XP Luna horizontal gloss gradient
        t = x / tw
        if t < 0.5:
            factor = t / 0.5
            r = int(0 + (53 - 0) * factor)
            g = int(88 + (147 - 88) * factor)
            b = int(238 + (255 - 238) * factor)
        else:
            factor = (t - 0.5) / 0.5
            r = int(53 + (0 - 53) * factor)
            g = int(147 + (88 - 147) * factor)
            b = int(255 + (238 - 255) * factor)
        tb_draw.line([(x, 0), (x, titlebar_h)], fill=(r, g, b, 255))

    # Top highlight line for XP titlebar gloss
    tb_draw.line([(0, 1), (tw, 1)], fill=(120, 185, 255, 180), width=1)
    tb_draw.line([(0, 0), (tw, 0)], fill=(0, 60, 180, 255), width=1)

    # Mask titlebar for top rounded corners
    tb_mask = Image.new("L", (tw, titlebar_h), 0)
    tb_mask_draw = ImageDraw.Draw(tb_mask)
    tb_mask_draw.rounded_rectangle([0, 0, tw, titlebar_h + 20], radius=radius, fill=255)
    img.paste(titlebar_img, (wx0, wy0), tb_mask)

    # Titlebar Elements: Icon + Title
    tb_icon_x = wx0 + 14
    tb_icon_y = wy0 + 12
    # Draw mini CRT monitor icon
    draw.rectangle([tb_icon_x, tb_icon_y, tb_icon_x + 18, tb_icon_y + 14], fill=(20, 20, 25), outline=(200, 220, 255), width=1)
    draw.rectangle([tb_icon_x + 2, tb_icon_y + 2, tb_icon_x + 16, tb_icon_y + 12], fill=(0, 180, 255))
    draw.polygon([(tb_icon_x + 6, tb_icon_y + 15), (tb_icon_x + 12, tb_icon_y + 15), (tb_icon_x + 14, tb_icon_y + 18), (tb_icon_x + 4, tb_icon_y + 18)], fill=(180, 190, 200))

    # Titlebar Text
    tb_text = "cmd.exe - System Analyst & Solution Architect Workstation [WinXP Luna v5.1]"
    # Soft text shadow
    draw.text((tb_icon_x + 28, wy0 + 13), tb_text, font=font_xp_title, fill=(0, 30, 80, 200))
    draw.text((tb_icon_x + 27, wy0 + 12), tb_text, font=font_xp_title, fill=(255, 255, 255, 255))

    # Classic XP Window Buttons on the right
    # Button box dimensions: 22 x 22
    btn_y = wy0 + 10
    # Minimize Button
    btn_min_x = wx1 - 85
    draw.rounded_rectangle([btn_min_x, btn_y, btn_min_x + 22, btn_y + 21], radius=3, fill=(44, 124, 252), outline=(255, 255, 255, 180), width=1)
    draw.line([(btn_min_x + 5, btn_y + 15), (btn_min_x + 17, btn_y + 15)], fill=(255, 255, 255), width=2)

    # Maximize Button
    btn_max_x = wx1 - 58
    draw.rounded_rectangle([btn_max_x, btn_y, btn_max_x + 22, btn_y + 21], radius=3, fill=(44, 124, 252), outline=(255, 255, 255, 180), width=1)
    draw.rectangle([btn_max_x + 5, btn_y + 5, btn_max_x + 17, btn_y + 16], outline=(255, 255, 255), width=2)

    # Close Button (Red)
    btn_cls_x = wx1 - 31
    draw.rounded_rectangle([btn_cls_x, btn_y, btn_cls_x + 22, btn_y + 21], radius=3, fill=(232, 17, 35), outline=(255, 255, 255, 220), width=1)
    # White X
    draw.line([(btn_cls_x + 6, btn_y + 6), (btn_cls_x + 16, btn_y + 16)], fill=(255, 255, 255), width=2)
    draw.line([(btn_cls_x + 16, btn_y + 6), (btn_cls_x + 6, btn_y + 16)], fill=(255, 255, 255), width=2)

    # 3. Inside Window Content Area
    content_x = wx0 + 44
    curr_y = wy0 + 64

    # Command line prompt line
    prompt_badge_bg = (18, 30, 56)
    draw.rounded_rectangle([content_x, curr_y, content_x + 680, curr_y + 30], radius=6, fill=prompt_badge_bg, outline=(37, 99, 235, 120), width=1)
    draw.text((content_x + 12, curr_y + 6), "C:\\ARCHITECT> whoami --role --spec", font=font_mono, fill=(148, 163, 184))
    
    # Online status pill on the right of prompt
    status_x = wx1 - 240
    draw.rounded_rectangle([status_x, curr_y, status_x + 195, curr_y + 30], radius=15, fill=(16, 185, 129, 25), outline=(16, 185, 129, 120), width=1)
    draw.ellipse([status_x + 12, curr_y + 11, status_x + 20, curr_y + 19], fill=(52, 211, 153))
    draw.text((status_x + 28, curr_y + 6), "STATUS: VERIFIED", font=font_mono_bold, fill=(52, 211, 153))

    curr_y += 50

    # Main Headline Name: "Andhika Putra Pratama, S.Kom."
    name_text = "Andhika Putra Pratama, S.Kom."
    # Text shadow for prominence
    draw.text((content_x + 2, curr_y + 3), name_text, font=font_title, fill=(0, 0, 0, 180))
    draw.text((content_x, curr_y), name_text, font=font_title, fill=(255, 255, 255))

    curr_y += 66

    # Subtitle: "Senior System Analyst & Enterprise Solution Architect"
    sub_text = "Senior System Analyst & Enterprise Solution Architect"
    draw.text((content_x + 1, curr_y + 1), sub_text, font=font_subtitle, fill=(14, 116, 144, 200))
    draw.text((content_x, curr_y), sub_text, font=font_subtitle, fill=(56, 189, 248)) # Bright Cyan #38bdf8

    curr_y += 50

    # Badge: "The Triad: SA 50% • DEV 25% • QA 25%"
    badge_text = "The Triad: SA 50%  •  DEV 25%  •  QA 25%"
    bbox = draw.textbbox((0, 0), badge_text, font=font_badge)
    bw = bbox[2] - bbox[0] + 44
    bh = 40

    # Badge Pill with glossy border & dark blue background
    draw.rounded_rectangle(
        [content_x, curr_y, content_x + bw, curr_y + bh],
        radius=20,
        fill=(15, 34, 72),
        outline=(59, 130, 246),
        width=2
    )
    # Inner glow line
    draw.line([(content_x + 20, curr_y + 2), (content_x + bw - 20, curr_y + 2)], fill=(147, 197, 253, 160), width=1)
    
    # Styled colored segments inside the badge
    # Draw segments:
    # "The Triad: " (amber #fbbf24)
    # "SA 50%" (blue #60a5fa)
    # " • " (slate #94a3b8)
    # "DEV 25%" (emerald #34d399)
    # " • " (slate #94a3b8)
    # "QA 25%" (purple #c084fc)
    tx = content_x + 22
    ty = curr_y + 8

    seg1 = "The Triad: "
    draw.text((tx, ty), seg1, font=font_badge, fill=(250, 204, 21)) # Amber #facc15
    tx += draw.textbbox((0, 0), seg1, font=font_badge)[2]

    seg2 = "SA 50%"
    draw.text((tx, ty), seg2, font=font_badge, fill=(96, 165, 250)) # Light Blue
    tx += draw.textbbox((0, 0), seg2, font=font_badge)[2]

    seg3 = "  •  "
    draw.text((tx, ty), seg3, font=font_badge, fill=(148, 163, 184))
    tx += draw.textbbox((0, 0), seg3, font=font_badge)[2]

    seg4 = "DEV 25%"
    draw.text((tx, ty), seg4, font=font_badge, fill=(52, 211, 153)) # Emerald
    tx += draw.textbbox((0, 0), seg4, font=font_badge)[2]

    seg5 = "  •  "
    draw.text((tx, ty), seg5, font=font_badge, fill=(148, 163, 184))
    tx += draw.textbbox((0, 0), seg5, font=font_badge)[2]

    seg6 = "QA 25%"
    draw.text((tx, ty), seg6, font=font_badge, fill=(216, 180, 254)) # Purple
    tx += draw.textbbox((0, 0), seg6, font=font_badge)[2]

    curr_y += 62

    # 4. Technical Competency Pillar Cards / Tags
    # 4 Feature cards in a 2x2 grid or horizontal row
    # Let's do 4 horizontal tags in 2 rows or 4 columns
    # Width available: wx1 - wx0 - 88 = 992px
    pillars = [
        ("40+ Enterprise Specs", "SRS • BRD • TAD • BPMN 2.0"),
        ("BUMN & FinTech Core", "Multi-Tenant Architecture"),
        ("Distributed Concurrency", "Seat Lock & Redis Engine"),
        ("Quality Assurance Rigor", "SIT / UAT Sign-offs & Gates"),
    ]

    col_w = 238
    gap = 14
    pill_y = curr_y

    for i, (p_title, p_desc) in enumerate(pillars):
        px = content_x + i * (col_w + gap)
        # Card container
        draw.rounded_rectangle(
            [px, pill_y, px + col_w, pill_y + 64],
            radius=8,
            fill=(18, 28, 52),
            outline=(37, 99, 235, 100),
            width=1
        )
        # Accent top bar on each card
        accent_colors = [(59, 130, 246), (16, 185, 129), (245, 158, 11), (168, 85, 247)]
        draw.line([(px + 8, pill_y + 1), (px + col_w - 8, pill_y + 1)], fill=accent_colors[i], width=2)
        
        # Text inside card
        draw.text((px + 12, pill_y + 12), p_title, font=font_tag_bold, fill=(241, 245, 249))
        draw.text((px + 12, pill_y + 36), p_desc, font=font_status, fill=(148, 163, 184))

    # 5. Window Footer Status Bar (Authentic XP Style)
    footer_h = 36
    footer_y = wy1 - footer_h - 1
    # Background
    draw.rounded_rectangle(
        [wx0 + 2, footer_y, wx1 - 2, wy1 - 2],
        radius=8,
        fill=(10, 16, 30),
        outline=(30, 41, 59),
        width=1
    )
    # Subtle top dividing line
    draw.line([(wx0 + 2, footer_y), (wx1 - 2, footer_y)], fill=(30, 58, 102), width=1)

    # Footer Left: Site URL
    draw.text((wx0 + 16, footer_y + 10), "URL: https://andhikapp28.github.io/newporto/", font=font_status, fill=(100, 150, 220))

    # Footer Right: Education & Links
    footer_right = "ITERA Alumni  |  GitHub: andhikapp28  |  LinkedIn: andhikaputrapratama"
    fr_w = draw.textbbox((0, 0), footer_right, font=font_status)[2]
    draw.text((wx1 - fr_w - 18, footer_y + 10), footer_right, font=font_status, fill=(148, 163, 184))

    # Save final image
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    # Convert RGBA to RGB for standard PNG or keep RGBA
    img_rgb = img.convert("RGB")
    img_rgb.save(output_path, "PNG", optimize=True)
    print(f"Generated successfully: {output_path} ({width}x{height})")

if __name__ == "__main__":
    create_og_image("E:/KODING/Porto/public/images/og-preview.png")
