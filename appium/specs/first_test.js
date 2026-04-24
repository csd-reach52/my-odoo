describe("My Android Automation", () => {
  it("should verify the app is launched", async () => {
    // This waits for the app to be visible
    const isAppVisible = await driver.isAppInstalled("com.example.myapp");
    // Note: Change 'com.example.myapp' to your actual package name!

    console.log(`Is app installed? ${isAppVisible}`);
    await expect(isAppVisible).toBe(true);
  });
});
