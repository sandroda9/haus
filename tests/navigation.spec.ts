import {test,expect} from '@playwright/test';
test('responsive Hauptnavigation und CTA',async ({page})=>{
 await page.goto('/haus/');await expect(page.locator('h1').first()).toBeVisible();await expect(page).toHaveTitle(/Haus Hochwiese 1/);
 await expect(page.locator('.hero-visual img')).toHaveAttribute('src',/Haus_Hochwiese_1\.webp/);
 await expect(page.locator('.visual-caption')).toHaveText('01 / AKTUELLE AUSSENANSICHT');
 await expect.poll(()=>page.locator('.hero-visual img').evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 await page.getByRole('link',{name:/Exposé anfragen/}).first().click();
 await expect(page.locator('#kontakt')).toBeInViewport();
 await expect(page.locator('#intent')).toHaveValue('expose');
});
test('Mobiles Menü mit Escape',async ({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/haus/');
 const menu=page.getByRole('button',{name:'Menü öffnen'});await menu.click();
 await expect(page.locator('#mobile-menu')).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.locator('#mobile-menu')).toBeHidden();
});
test('Zweistufiger Galerie-Filter, Verlauf und Leerzustand',async ({page})=>{
 await page.goto('/haus/galerie');await expect(page.locator('[data-area-group]')).toBeHidden();
 await page.locator('#gallery-variant').selectOption('modern');await expect(page.locator('[data-area-group]')).toBeVisible();
 await page.locator('[data-area=kueche]').click();await expect(page.locator('.gallery-item')).toHaveCount(1);
 await expect(page).toHaveURL(/variante=modern.*bereich=kueche/);
 await page.locator('#gallery-variant').selectOption('familie');await expect(page.locator('[data-area=alle-bereiche]')).toHaveAttribute('aria-pressed','true');
 await page.goBack();await expect(page.locator('#gallery-variant')).toHaveValue('modern');
 await expect(page.locator('[data-area=kueche]')).toHaveAttribute('aria-pressed','true');
 await page.locator('#gallery-variant').selectOption('aktuell');await page.locator('[data-area=aussenbereich]').click();
 await expect(page.locator('.gallery-item')).toHaveCount(8);
 await expect(page.locator('.gallery-item').first()).toHaveAttribute('href',/Haus_Hochwiese_1\.webp/);
 await expect(page.locator('.gallery-item small').first()).toHaveText('Aktueller Zustand – Originalaufnahme');
 await expect.poll(()=>page.locator('.gallery-item img').first().evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
});
test('Kontaktformular bleibt ohne Formspree-Endpunkt deaktiviert',async({page})=>{
 await page.goto('/haus/kontakt?anliegen=besichtigung');await expect(page.locator('#intent')).toHaveValue('besichtigung');
 await expect(page.locator('[data-submit]')).toBeDisabled();
 await expect(page.locator('.form-footnote')).toContainText('noch nicht eingerichtet');
});
test('Unterlagen-Anfragen bleiben im GitHub-Pages-Unterpfad',async({page})=>{
 await page.goto('/haus/unterlagen');
 await expect(page.getByRole('link',{name:/Unterlage anfragen/}).first()).toHaveAttribute('href',/^\/haus\/kontakt\?/);
});
