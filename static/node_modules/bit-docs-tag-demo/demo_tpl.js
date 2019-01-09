// Note that the space in the <code> </code> blocks is significant:
// without it, any demo in a page would break the rest of the code
// examples throughout the page.

module.exports = `
	<ul>
		<li class="tab" data-tab="demo">Demo</li>
		<li class="tab" data-tab="html" style="display:none">HTML</li>
		<li class="tab" data-tab="js" style="display:none;">JS</li>
	</ul>
	<div class="tab-content" data-for="demo">
		<iframe></iframe>
	</div>
	<div class="tab-content" data-for="html">
		<pre class="line-numbers language-html"><code> </code></pre>
	</div>
	<div class="tab-content" data-for="js">
		<pre class="line-numbers language-js"><code> </code></pre>
	</div>
`;
