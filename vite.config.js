export default {
  root: "src",
  assetsDir: "./src/img/",
  build: {
    base: "/Sakamata",
    outDir: "../dist",
    publicUrl: "./",
    emptyOutDir: true,
    target: "esnext",
    polyfillDynamicImport: false,
    files: ["index.html", "js/**/*.js", "css/**/*.css"],
  },
}
