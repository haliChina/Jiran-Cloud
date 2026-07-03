from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # 访问首页
    page.goto('http://localhost:8899/index.html')
    page.wait_for_load_state('networkidle')

    # 查找所有"下载"链接
    links = page.locator('a:has-text("下载")').all()
    print(f"Found {len(links)} download links")
    for i, link in enumerate(links):
        href = link.get_attribute('href')
        text = link.inner_text()
        print(f"  Link {i}: text='{text}', href='{href}'")

    # 点击导航栏的"下载"链接
    nav = page.locator('#nav a:has-text("下载")')
    if nav.count() > 0:
        href_before = nav.get_attribute('href')
        print(f"\nNav download link href: {href_before}")

        # 点击并监听 URL 变化
        nav.click()
        page.wait_for_timeout(2000)
        print(f"URL after click: {page.url}")

    browser.close()
