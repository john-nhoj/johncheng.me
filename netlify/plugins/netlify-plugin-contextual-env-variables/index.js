module.exports = {
  onPreBuild: () => {
    // Get context of the deployment. Can be PRODUCTION, STAGING or DEPLOY_PREVIEW
    const context = process.env.CONTEXT.toUpperCase().replace(/-/g, "_");
    // Loop though environment variables
    Object.keys(process.env).forEach((key) => {
      // Check if key has context in it
      const keyNeedsOverride = key.startsWith(context);
      // If key starts with context, override with value
      const cleanedKey = key.replace(context, "");
      const val = process.env[key];
      if (keyNeedsOverride) {
        console.log(`Adding ${cleanedKey} to environment variables`);
        process.env[cleanedKey] = val;
      }
    });
  },
};
