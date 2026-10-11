import {test,expect} from '@playwright/test';
test('responsive Hauptnavigation und CTA',async ({page})=>{
 await page.goto('/');await expect(page.locator('h1')).toBeVisible();
 await page.getByRole('link',{name:/Exposé anfragen/}).first().click();
 await expect(page.locator('#kontakt')).toBeInViewport();
 await expect(page.locator('#intent')).toHaveValue('expose');
});
test('Mobiles Menü mit Escape',async ({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 const menu=page.getByRole('button',{name:'Menü öffnen'});await menu.click();
 await expect(page.locator('#mobile-menu')).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.locator('#mobile-menu')).toBeHidden();
});
test('Zweistufiger Galerie-Filter, Verlauf und Leerzustand',async ({page})=>{
 await page.goto('/galerie');await expect(page.locator('[data-area-group]')).toBeHidden();
 await page.locator('#gallery-variant').selectOption('modern');await expect(page.locator('[data-area-group]')).toBeVisible();
 await page.locator('[data-area=kueche]').click();await expect(page.locator('.gallery-item')).toHaveCount(1);
 await expect(page).toHaveURL(/variante=modern.*bereich=kueche/);
 await page.locator('#gallery-variant').selectOption('familie');await expect(page.locator('[data-area=alle-bereiche]')).toHaveAttribute('aria-pressed','true');
 await page.goBack();await expect(page.locator('#gallery-variant')).toHaveValue('modern');
 await expect(page.locator('[data-area=kueche]')).toHaveAttribute('aria-pressed','true');
 await page.locator('#gallery-variant').selectOption('aktuell');await page.locator('[data-area=aussenbereich]').click();
 await expect(page.locator('[data-gallery-empty]')).toBeVisible();
});
test('Kontakt-Demo signalisiert Nichtkonfiguration',async({page})=>{
 await page.goto('/kontakt?anliegen=besichtigung');await expect(page.locator('#intent')).toHaveValue('besichtigung');
 await page.locator('#firstName').fill('Anna');await page.locator('#lastName').fill('Muster');await page.locator('#email').fill('anna@example.ch');
 await page.locator('#message').fill('Bitte kontaktieren Sie mich zu einer Besichtigung.');
 await page.locator('[name=privacy]').check();await page.locator('[data-submit]').click();
 await expect(page.locator('[data-form-status]')).toContainText('nicht aktiviert');
});
