describe("VBMS", () => {
  it("should verify the app is launched", async () => {
    const isAppVisible = await driver.isAppInstalled("com.example.myapp");

    console.log(`Is app installed? ${isAppVisible}`);
    await expect(isAppVisible).toBe(true);
  });
});
