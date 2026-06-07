// WayPAY Premium Explainer Engine — with bilingual support, lang toggle, key facts
(function(){
  const key  = window.WAYPAY_KEY || '';
  const lang = window.WAYPAY_LANG || localStorage.getItem('waypay_lang') || 'da';
  let cfg = window.WAYPAY_EXPLAINER;

  // Merge DA translations on top of EN base config
  if (lang === 'da' && window.WAYPAY_DA && window.WAYPAY_DA[key]) {
    cfg = Object.assign({}, cfg, window.WAYPAY_DA[key]);
  }

  // Key facts: DA from WAYPAY_DA, EN from WAYPAY_EN_FACTS
  const facts = (lang === 'da'
    ? (window.WAYPAY_DA && window.WAYPAY_DA[key] && window.WAYPAY_DA[key].keyFacts)
    : (window.WAYPAY_EN_FACTS && window.WAYPAY_EN_FACTS[key])) || [];

  // Metrics fallback (some configs omit this)
  const metrics = cfg.metrics || [
    {value:'#1',label:'Platform'},
    {value:'✓',label:'Automated'},
    {value:'↑',label:'Growth'},
  ];

  document.documentElement.style.setProperty('--accent', cfg.accent);
  document.documentElement.style.setProperty('--soft', cfg.soft);
  document.title = cfg.title + ' | WayPAY Explainer';

  const isDA = lang === 'da';
  const otherLang = isDA ? 'EN' : 'DA';
  const overviewLabel = isDA ? 'Oversigt' : 'Overview';
  const playAgainLabel = isDA ? 'Afspil igen' : 'Play again';
  const keyFactsLabel = isDA ? 'Nøglefakta' : 'Key facts';
  const ctaKicker = isDA ? 'Kom igang med en gratis business profil' : 'Get started with a free business profile';
  const ctaPrimary = isDA ? 'Opret min forretning' : 'Create my business';

  const factsHTML = facts.length ? `
  <div class="key-facts-bar pre-anim anim-fade-up" style="animation-delay:.5s">
    <span class="key-facts-label"><i class="fa fa-star"></i> ${keyFactsLabel}</span>
    ${facts.map(f=>`<span class="key-fact-item"><i class="fa fa-check-circle"></i> ${f}</span>`).join('')}
  </div>` : '';

  document.body.innerHTML = `
<a class="back-link" href="../premium-library.html"><i class="fa fa-arrow-left"></i> ${overviewLabel}</a>
<div class="scene-number"><span id="sceneCounter">1</span> / <span id="sceneTotal">6</span></div>
<div class="control-bar">
  <button class="control-btn" id="prevBtn"><i class="fa fa-step-backward"></i></button>
  <button class="control-btn" id="playBtn"><i class="fa fa-pause"></i></button>
  <button class="control-btn" id="nextBtn"><i class="fa fa-step-forward"></i></button>
  <button class="control-btn lang-toggle-btn" id="langBtn" title="Switch language">${otherLang}</button>
</div>
<div class="progress-wrap"><div class="progress-bar" id="progress"></div></div>
<div class="voiceover" id="voiceover"><p id="voiceoverText" class="text-base md:text-lg text-slate-700 font-semibold text-center"></p></div>
<main class="video-container">

  <!-- Scene 1: Intro -->
  <section class="scene active bg-gradient-to-br from-white via-slate-50 to-emerald-50">
    <div class="floating-orb w-96 h-96 -top-24 -right-24" style="background:${cfg.accent}33"></div>
    <div class="max-w-6xl mx-auto text-center">
      <div class="pre-anim anim-fade-down inline-flex items-center gap-3 mb-8">
        <div class="w-16 h-16 rounded-2xl accent-bg text-white grid place-items-center shadow-xl"><i class="fa ${cfg.icon} text-3xl"></i></div>
        <div class="text-left"><h1 class="text-4xl font-black">WayPAY</h1><p class="font-black accent-text">${cfg.label}</p></div>
      </div>
      <h2 class="pre-anim anim-fade-up text-5xl md:text-7xl font-black leading-none">${cfg.headline}</h2>
      <p class="pre-anim anim-fade-up mt-7 text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">${cfg.subline}</p>
      <div class="pre-anim anim-scale mt-10 inline-flex gap-3 flex-wrap justify-center">
        ${cfg.pills.map(p=>`<span class="feature-pill"><i class="fa fa-check"></i> ${p}</span>`).join('')}
      </div>
      ${factsHTML}
    </div>
  </section>

  <!-- Scene 2: Problem + Photo -->
  <section class="scene bg-white">
    <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
      <div class="premium-photo pre-anim anim-right" style="background-image:linear-gradient(135deg,${cfg.accent}22,rgba(15,23,42,.14)),url('${cfg.photo}')">
        <div class="photo-label"><h3 class="text-2xl font-black">${cfg.photoTitle}</h3><p class="text-slate-600 mt-1">${cfg.photoText}</p></div>
      </div>
      <div>
        <span class="feature-pill pre-anim anim-left">${cfg.problemBadge}</span>
        <h2 class="pre-anim anim-left mt-6 text-5xl md:text-6xl font-black leading-none">${cfg.problemTitle}</h2>
        <p class="pre-anim anim-left mt-6 text-xl text-slate-600">${cfg.problemText}</p>
        <div class="pre-anim anim-left mt-8 grid grid-cols-3 gap-4">
          ${metrics.map(m=>`<div class="ui-card p-5"><b class="text-3xl accent-text">${m.value}</b><p class="font-black text-slate-700">${m.label}</p></div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- Scene 3: Solution + Phone -->
  <section class="scene bg-slate-950 text-white">
    <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div class="pre-anim anim-scale flex justify-center">
        <div class="phone">
          <div class="phone-top"></div>
          <div class="p-5 text-slate-900">
            <small class="font-black text-slate-500">${cfg.uiKicker}</small>
            <h3 class="font-black text-xl">${cfg.uiTitle}</h3>
            <div class="mt-4 space-y-3">
              ${cfg.uiRows.map(r=>`<div class="rounded-2xl bg-slate-50 p-4 border"><b>${r.title}</b><p class="text-sm text-slate-500">${r.text}</p></div>`).join('')}
            </div>
            <button class="mt-5 w-full rounded-2xl accent-bg text-white py-4 font-black">${cfg.uiButton}</button>
          </div>
        </div>
      </div>
      <div>
        <span class="feature-pill pre-anim anim-left">${cfg.solutionBadge}</span>
        <h2 class="pre-anim anim-left mt-6 text-5xl md:text-6xl font-black leading-none">${cfg.solutionTitle}</h2>
        <p class="pre-anim anim-left mt-6 text-xl text-slate-300">${cfg.solutionText}</p>
      </div>
    </div>
  </section>

  <!-- Scene 4: Flow infographic -->
  <section class="scene bg-white">
    <div class="max-w-7xl mx-auto w-full">
      <div class="text-center max-w-4xl mx-auto">
        <span class="feature-pill pre-anim anim-fade-down">${cfg.flowBadge}</span>
        <h2 class="pre-anim anim-fade-up mt-6 text-5xl md:text-6xl font-black leading-none">${cfg.flowTitle}</h2>
      </div>
      <div class="mt-14 grid md:grid-cols-4 gap-6">
        ${cfg.flow.map((f,i)=>`<div class="flow-node pre-anim anim-scale" style="animation-delay:${i*.15}s"><div class="flow-num">${i+1}</div><h3 class="text-xl font-black">${f.title}</h3><p class="text-slate-600 mt-2">${f.text}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Scene 5: Features -->
  <section class="scene bg-gradient-to-br from-slate-50 via-white to-white">
    <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span class="feature-pill pre-anim anim-right">${cfg.featuresBadge}</span>
        <h2 class="pre-anim anim-right mt-6 text-5xl md:text-6xl font-black leading-none">${cfg.featuresTitle}</h2>
        <p class="pre-anim anim-right mt-6 text-xl text-slate-600">${cfg.featuresText}</p>
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        ${cfg.features.map((f,i)=>`<div class="ui-card pre-anim anim-left p-6" style="animation-delay:${i*.12}s"><i class="fa ${f.icon} accent-text text-3xl"></i><h3 class="font-black text-xl mt-4">${f.title}</h3><p class="text-slate-600 mt-2">${f.text}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Scene 6: CTA -->
  <section class="scene text-white" style="background:linear-gradient(135deg,${cfg.accent},#059669)">
    <div class="max-w-5xl mx-auto text-center">
      <div class="pre-anim anim-scale w-20 h-20 rounded-3xl bg-white accent-text grid place-items-center mx-auto"><i class="fa ${cfg.icon} text-4xl"></i></div>
      <h2 class="pre-anim anim-fade-up mt-8 text-5xl md:text-7xl font-black leading-none">${cfg.ctaTitle}</h2>
      <p class="pre-anim anim-fade-up mt-6 text-2xl text-white/90">${cfg.ctaText}</p>
      <p class="pre-anim anim-fade-up mt-10 text-white/75 text-sm font-bold tracking-wide uppercase" style="letter-spacing:.08em">${ctaKicker}</p>
      <a href="https://waypay.dk/opret" class="pre-anim anim-fade-up mt-3 inline-flex items-center gap-3 bg-white accent-text rounded-2xl px-8 py-5 font-black text-xl shadow-2xl hover:shadow-none transition" style="text-decoration:none">${ctaPrimary} <i class="fa fa-arrow-right text-base"></i></a>
      <div class="pre-anim anim-fade-up mt-5"><button onclick="restartExplainer()" class="text-white/55 text-sm font-semibold hover:text-white/80 transition" style="background:none;border:none;cursor:pointer">↺ ${playAgainLabel}</button></div>
    </div>
  </section>

</main>`;

  window.WAYPAY_VOICEOVERS = cfg.voiceovers;

  // Language toggle handler
  document.getElementById('langBtn').addEventListener('click', function(){
    const next = lang === 'da' ? 'en' : 'da';
    localStorage.setItem('waypay_lang', next);
    location.reload();
  });
})();
