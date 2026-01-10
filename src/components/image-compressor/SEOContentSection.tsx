export function SEOContentSection() {
  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-sm border border-blue-200/50 dark:border-blue-800/30 p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          How to Compress Images Online
        </h2>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm text-slate-600 dark:text-slate-300">
          <div>
            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Why Compress Images?
            </h3>
            <p className="leading-relaxed">
              Large images slow down websites, eat up storage, and can't be shared via email. 
              Compressing reduces file size by <strong>50-80%</strong> while maintaining visual quality.
              Faster pages = better Google rankings and happier users.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              JPG vs PNG vs WebP
            </h3>
            <p className="leading-relaxed">
              <strong>JPG</strong>: Best for photos. Lossy compression.
              <strong> PNG</strong>: Best for graphics with transparency. Lossless.
              <strong> WebP</strong>: Modern format, 25-35% smaller than JPG. Use for web.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              100% Private & Secure
            </h3>
            <p className="leading-relaxed">
              Unlike other tools, we <strong>never upload your images</strong>. All processing happens 
              directly in your browser using advanced JavaScript APIs. Your files stay on your device.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Batch Processing
            </h3>
            <p className="leading-relaxed">
              Need to compress hundreds of images? Drop them all at once. Apply the same settings 
              to every image, then download as a <strong>ZIP file</strong> with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
