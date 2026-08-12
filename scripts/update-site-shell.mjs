#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const pages = {
	"index.html": {
		nav: "overview",
		title: "INDIGO Astronomy — Open-source telescope control and imaging",
		description: "INDIGO is open-source astronomical imaging and instrument control software for observatories, remote setups and backyard telescopes.",
		canonical: "https://www.indigo-astronomy.org/"
	},
	"for-users.html": {
		nav: "start",
		title: "Get started with INDIGO Astronomy",
		description: "Install INDIGO, connect astronomy equipment and start imaging on Linux, macOS, Windows or Raspberry Pi.",
		canonical: "https://www.indigo-astronomy.org/for-users.html"
	},
	"for-developers.html": {
		nav: "docs",
		title: "INDIGO developer documentation and source code",
		description: "Build INDIGO from source and learn how to create astronomy clients, drivers, agents and integrations with the INDIGO APIs.",
		canonical: "https://www.indigo-astronomy.org/for-developers.html"
	},
	"for-vendors.html": {
		nav: "docs",
		title: "INDIGO for astronomy hardware vendors",
		description: "Integrate astronomy hardware with INDIGO through an open, business-friendly driver framework and cross-platform software ecosystem.",
		canonical: "https://www.indigo-astronomy.org/for-vendors.html"
	},
	"hardware.html": {
		nav: "hardware",
		title: "Supported astronomy cameras, mounts and devices | INDIGO",
		description: "Search the cameras, mounts, focusers, filter wheels, domes and other astronomy equipment supported by INDIGO 3.",
		canonical: "https://www.indigo-astronomy.org/hardware.html"
	},
	"hardware-2.0.html": {
		nav: "hardware",
		title: "INDIGO 2 supported astronomy hardware archive",
		description: "Archived list of astronomy equipment drivers and agents included with the legacy INDIGO 2 release series.",
		canonical: "https://www.indigo-astronomy.org/hardware-2.0.html"
	},
	"software.html": {
		nav: "software",
		title: "Astronomy software compatible with INDIGO",
		description: "Explore native and third-party astronomy imaging, guiding and telescope control applications compatible with INDIGO.",
		canonical: "https://www.indigo-astronomy.org/software.html"
	},
	"downloads.html": {
		nav: "downloads",
		title: "Download INDIGO 3 for Linux, macOS and Windows",
		description: "Download INDIGO 3 infrastructure, control panel, Ain Imager and SDK packages for Linux, macOS and Windows.",
		canonical: "https://www.indigo-astronomy.org/downloads.html"
	},
	"indigo-sky.html": {
		nav: "software",
		title: "INDIGO Sky for Raspberry Pi",
		description: "Run a preconfigured INDIGO astronomy server on Raspberry Pi with INDIGO Sky, including Wi-Fi setup and remote control guides.",
		canonical: "https://www.indigo-astronomy.org/indigo-sky.html"
	},
	"faq.html": {
		nav: "docs",
		title: "INDIGO Astronomy frequently asked questions",
		description: "Answers about INDIGO architecture, supported platforms and interoperability with INDI, ASCOM and ALPACA.",
		canonical: "https://www.indigo-astronomy.org/faq.html"
	},
	"about.html": {
		nav: "about",
		title: "About the INDIGO Initiative",
		description: "Meet the astronomers, developers, contributors and hardware companies behind the open-source INDIGO astronomy project.",
		canonical: "https://www.indigo-astronomy.org/about.html"
	}
};

const navItems = [
	["overview", "./", "Overview"],
	["start", "for-users.html", "Get started"],
	["hardware", "hardware.html", "Hardware"],
	["software", "software.html", "Software"],
	["docs", "for-developers.html", "Documentation"],
	["about", "about.html", "About"]
];

function head(file, page) {
	const verification = file === "index.html"
		? '\n\t\t<meta name="google-site-verification" content="sn6qF-EZJv6OhHGyT_Hczdofj5laIXHRjDZ2oqpzb8I">'
		: "";
	const structuredData = file === "index.html" ? `
		<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@graph": [
				{
					"@type": "Organization",
					"@id": "https://www.indigo-astronomy.org/#organization",
					"name": "The INDIGO Initiative",
					"url": "https://www.indigo-astronomy.org/",
					"logo": "https://www.indigo-astronomy.org/img/logo.png",
					"sameAs": ["https://github.com/indigo-astronomy/indigo"]
				},
				{
					"@type": "WebSite",
					"@id": "https://www.indigo-astronomy.org/#website",
					"url": "https://www.indigo-astronomy.org/",
					"name": "INDIGO Astronomy",
					"publisher": { "@id": "https://www.indigo-astronomy.org/#organization" }
				}
			]
		}
		</script>` : "";

	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>${page.title}</title>
		<meta name="description" content="${page.description}">
		<link rel="canonical" href="${page.canonical}">
		<link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt">
		<meta property="og:type" content="website">
		<meta property="og:site_name" content="INDIGO Astronomy">
		<meta property="og:title" content="${page.title}">
		<meta property="og:description" content="${page.description}">
		<meta property="og:url" content="${page.canonical}">
		<meta property="og:image" content="https://www.indigo-astronomy.org/img/logo.png">
		<meta name="twitter:card" content="summary_large_image">${verification}
		<link rel="icon" href="img/favicon.ico" sizes="any">
		<link rel="icon" type="image/png" href="img/favicon-32x32.png" sizes="32x32">
		<link rel="icon" type="image/png" href="img/favicon-16x16.png" sizes="16x16">
		<link rel="stylesheet" href="css/fontello.css">
		<link rel="stylesheet" href="css/indigo.css?v=11">${structuredData}
	</head>`;
}

function header(active) {
	const items = navItems.map(([id, href, label]) =>
		`\t\t\t\t\t<li><a href="${href}"${active === id ? ' aria-current="page"' : ""}>${label}</a></li>`
	).join("\n");
	const downloadCurrent = active === "downloads" ? ' aria-current="page"' : "";
	return `<body>
		<a class="skip-link" href="#main-content">Skip to content</a>
		<header class="site-header">
			<div class="container site-header__inner">
				<a class="site-brand" href="./" aria-label="INDIGO Astronomy home">
					<img src="img/logo.png" width="32" height="44" alt="">
					<span>INDIGO <span>Astronomy</span></span>
				</a>
				<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
					<span class="sr-only">Open navigation</span><span></span><span></span><span></span>
				</button>
				<nav class="primary-nav" id="primary-nav" aria-label="Primary">
					<ul>
${items}
						<li><a class="nav-download" href="downloads.html"${downloadCurrent}>Downloads</a></li>
					</ul>
				</nav>
			</div>
		</header>`;
}

const footer = `<footer class="site-footer">
			<div class="container">
				<div class="site-footer__grid">
					<div class="site-footer__about">
						<h2>INDIGO Astronomy</h2>
						<p>Open-source astronomical imaging and instrument control software for observatories, remote setups and backyard telescopes.</p>
					</div>
					<div>
						<h2>Explore</h2>
						<ul><li><a href="for-users.html">Get started</a></li><li><a href="hardware.html">Supported hardware</a></li><li><a href="software.html">Compatible software</a></li></ul>
					</div>
					<div>
						<h2>Resources</h2>
						<ul><li><a href="for-developers.html">Documentation</a></li><li><a href="faq.html">FAQ</a></li><li><a href="indigo-sky.html">INDIGO Sky</a></li></ul>
					</div>
					<div>
						<h2>Community</h2>
						<ul><li><a href="https://github.com/indigo-astronomy/indigo" rel="noopener noreferrer">GitHub</a></li><li><a href="https://www.facebook.com/Linux-Mac-Astronomy-1437544996488964/" rel="noopener noreferrer">Facebook</a></li><li><a href="http://bb.cloudmakers.eu/">User group</a></li><li><a href="mailto:indigo@cloudmakers.eu">Contact</a></li></ul>
					</div>
				</div>
				<div class="site-footer__bottom">Copyright &copy; 2016-2026, The INDIGO Initiative. All rights reserved.</div>
			</div>
		</footer>
		<script src="js/site.js"></script>`;

for (const [file, page] of Object.entries(pages)) {
	const path = resolve(root, file);
	let html = await readFile(path, "utf8");
	html = html.replace(/<!DOCTYPE html>[\s\S]*?<\/head>/, head(file, page));
	if (html.includes('<header class="site-header">')) {
		html = html.replace(/<body>[\s\S]*?<\/header>(?:\s*<\/div>\s*<\/header>)*/, header(page.nav));
	} else {
		html = html.replace(/<body>[\s\S]*?<\/nav>/, header(page.nav));
	}
	html = html.replace(/\n\t\t<div class="container">\n(?=\t\t\t(?:<div class="row">|<h2>))/, '\n\t\t<main class="container site-main" id="main-content">\n');
	html = html.replace(/\n\t\t<\/div>\s*\n\s*<footer class="footer">[\s\S]*?<script src="js\/bootstrap\.min\.js"><\/script>/, `\n\t\t</main>\n\n\t\t${footer}`);
	html = html.replace(/<script src="js\/jquery\.min\.js"><\/script>[\s\S]*?(?=\n\t<\/body>)/, '<script src="js/site.js"></script>');
	html = html.replaceAll('href="index.html"', 'href="./"');
	html = html.replaceAll('target= "_new"', 'target="_blank"');
	html = html.replaceAll('target="_new"', 'target="_blank"');
	html = html.replace(/target="_blank"(?!\s+rel=)/g, 'target="_blank" rel="noopener noreferrer"');
	await writeFile(path, html);
}
