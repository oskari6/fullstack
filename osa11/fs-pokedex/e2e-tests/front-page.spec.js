const { test, describe, expect } = require('@playwright/test')

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('localhost:8080')
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })

  test('navigate to pokemon', async ({ page }) => {
    await page.goto('localhost:8080')
    const pokemon = page.getByText('ivysaur')

    await expect(pokemon).toBeVisible()
    await pokemon.click()

    await expect(page.getByText('ivysaur')).toBeVisible()
  })
})