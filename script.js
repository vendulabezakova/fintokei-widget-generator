let btnCount = 1;

function switchTab(name) {
  document.querySelectorAll('.tab').forEach((t, i) =>
    t.classList.toggle('active', ['tip', 'cta'][i] === name)
  );
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
}

function setBtnCount(n, el) {
  btnCount = n;
  document.querySelectorAll('.btn-count').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('second-btn-fields').classList.toggle('visible', n === 2);
}

function generateTip() {
  const title = document.getElementById('tip-title').value.trim() || '💡 Fintokei tip';
  const before = document.getElementById('tip-before').value.trim();
  const anchor = document.getElementById('tip-anchor').value.trim();
  const url = document.getElementById('tip-url').value.trim();
  const after = document.getElementById('tip-after').value.trim();

  let p = '';
  if (before) p += before + ' ';
  if (anchor && url) p += `<a href="${url}" style="color: #FA1ABB">${anchor}</a>`;
  if (after) p += ' ' + after;

  const html =
    `<div class="wp-block-custom-gutenberg-blocks-blog-text-block blog-text-block">\n` +
    `<h3 class="blog-text-block__title">${title}</h3> \n` +
    `<p>${p.trim()}</p>\n` +
    `</div>`;

  document.getElementById('tip-code').textContent = html;
  document.getElementById('tip-output').style.display = 'block';
}

function generateCTA() {
  const title = document.getElementById('cta-title').value.trim();
  const desc = document.getElementById('cta-desc').value.trim();
  const btn1text = document.getElementById('cta-btn1-text').value.trim();
  const btn1url = document.getElementById('cta-btn1-url').value.trim();
  const btn2text = document.getElementById('cta-btn2-text').value.trim();
  const btn2url = document.getElementById('cta-btn2-url').value.trim();

  const flexDir = btnCount === 2 ? 'row' : 'column';
  const descHtml = desc
    ? `\n  <p style="color: #d0b8f0; margin: 0 0 20px 0;">${desc}</p>`
    : '';

  let btns =
    `\n    <a href="${btn1url}" class="btn-v3 btn-v3--xxl-light" style="margin-top: 20px;">` +
    `<span class="btn--text" style="color:#210045;">${btn1text}</span></a>`;

  if (btnCount === 2) {
    btns +=
      `\n    <a href="${btn2url}" class="btn-v3 btn-v3--xxl-dark" style="margin-top: 20px;">` +
      `<span class="btn-border"></span>` +
      `<span class="btn--text" style="color:#6ceefa;">${btn2text}</span></a>`;
  }

  const html =
    `<section style="text-align: center; margin-top: 50px; ` +
    `background: linear-gradient(0deg, rgba(126,0,231,1) 28%, rgba(80,0,170,1) 68%); ` +
    `padding: 50px 40px; border-radius: 40px;">\n` +
    `<div>\n` +
    `  <h2 style="color: #fff; margin-bottom: 20px">${title}</h2>${descHtml}\n` +
    `  <div style="display: flex; flex-direction: ${flexDir}; justify-content: space-around; flex-wrap: wrap;">${btns}\n` +
    `  </div>\n` +
    `</div>\n` +
    `</section>`;

  document.getElementById('cta-code').textContent = html;
  document.getElementById('cta-output').style.display = 'block';
}

function resetTip() {
  document.getElementById('tip-title').value = '💡 Fintokei tip';
  ['tip-before', 'tip-anchor', 'tip-url', 'tip-after'].forEach(
    id => (document.getElementById(id).value = '')
  );
  document.getElementById('tip-output').style.display = 'none';
}

function resetCTA() {
  ['cta-title', 'cta-desc', 'cta-btn1-text', 'cta-btn1-url', 'cta-btn2-text', 'cta-btn2-url'].forEach(
    id => (document.getElementById(id).value = '')
  );
  document.getElementById('cta-output').style.display = 'none';
}

function copyCode(id, btn) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text).then(() => {
    const prefix = id === 'tip-code' ? 'tip' : 'cta';
    btn.classList.add('copied');
    document.getElementById(prefix + '-icon-copy').style.display = 'none';
    document.getElementById(prefix + '-icon-check').style.display = 'block';
    document.getElementById(prefix + '-copy-label').textContent = 'Zkopírováno';
    setTimeout(() => {
      btn.classList.remove('copied');
      document.getElementById(prefix + '-icon-copy').style.display = 'block';
      document.getElementById(prefix + '-icon-check').style.display = 'none';
      document.getElementById(prefix + '-copy-label').textContent = 'Kopírovat';
    }, 2000);
  });
}