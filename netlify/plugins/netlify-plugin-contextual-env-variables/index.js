module.exports = {
  onPreBuild: () => {
    const context = process.env.CONTEXT.toUpperCase().replace(/-/g, "_");
    console.log(`Updating environment variables with context: ${context}`);
    Object.keys(process.env).forEach((key) => {
      const envVar = `${context}_${key}`;
      const val = process.env[envVar];
      if (process.env[envVar]) {
        console.log(`Key ${key} has been updated.`);
        process.env[key] = val;
      }
    });
  },
};
