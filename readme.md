<h1 align="center">
  <img src="./.github/assets/gatsby-package-manager.jpg" />
	<br>

[![DOWNLOADS](https://img.shields.io/npm/dt/gatsby-package-manager?label=DOWNLOADS%20%20❯&colorA=673398&colorB=673398&style=flat)](https://www.npmjs.com/package/gatsby-package-manager) [![Learn VSCode](https://img.shields.io/badge/-VSCODE.pro%20%E2%86%92-gray.svg?colorB=673398&style=flat)](https://VSCode.pro/?utm_source=GitHubFOSS)
[![Follow @MrAhmadAwais on Twitter](https://img.shields.io/badge/FOLLOW%20@MRAHMADAWAIS%20%E2%86%92-gray.svg?colorA=673398&colorB=673398&style=flat)](https://twitter.com/mrahmadawais/)

Gatsby Package Manager `gpm`

</h1>

<p align="center">
The Gatsby Package Manager (gpm) helps you install a Gatsby package with all of its dependencies. It also allows you to read the docs for a package right there in the command line — without having to browse any sites.
</p>

<br>

[![📟](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/install.png)](./../../)

## Install

```sh
# Install globally via npm.
npm install -g gatsby-package-manager

# OR: Install globally via yarn.
yarn global add gatsby-package-manager
```

[![Installing gatsby-package-manager](./.github/assets/1.gif)](./../../)

> Now you have access to `gpm` or `gatsby-package-manager` in your command line.

<br>

[![⚙️](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/usage.png)](./../../)

## Usage

### ❯ Install a package

Installs a Gatsby package with all of its peer dependencies.

```sh
# 1: Interactive mode.
# Type `gpm` and answer the questions asked.
gpm

# Alternatively, you can also run it via:
gatsby-package-manager

# 2: Direct mode.
# Several ways to run the same command.
gpm install <pkgName>
gpm i <pkgName>
gpm install gatsby-plugin-mdx
gpm i gatsby-plugin-mdx
```

[![Install a package](./.github/assets/2.gif)](./../../)

### ❯ Docs for a package

Prints the docs, i.e., `readme.md` file of a package in the command line.

```sh
# Several ways to run the same command.
gpm docs <pkgName>
gpm d <pkgName>
gpm docs gatsby-plugin-mdx
gpm d gatsby-plugin-mdx
```

[![Docs for a package](./.github/assets/3.gif)](./../../)


### ❯ Configure `npm` or `yarn`

The `gatsby-package-manager (gpm)` stores your choice of using  `npm` or `yarn` in `~/.config/configstore/gatsby-package-manager.json` file. This choice can be re-configured by using the option `--config` or `-c` when running `gpm`.

```sh
gpm --config
gpm -c
gpm i gatsby-plugin-mdx -c
```

### ❯ Help documentation

You can run `gpm --help` or `gpm -h` to access the help documentation.

<br />

[![📃](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/options.png)](./../../)

## API: Plugin Authors

Make sure you mention all the extra dependencies as `peerDependencies` in the package.json file.

The `peerDependencies` in the `package.json` is what `gatsby-package-manager` looks for. For example: The `gatsby-plugin-mdx` has defined two [peerDependencies](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-mdx/package.json#L16-L19) `@mdx-js/mdx` and `@mdx-js/react` which are required for the [installation](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx#installation).

<br />

[![📝](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/log.png)](changelog.md)

## Changelog

[❯ Read the changelog here →](changelog.md)

<br>

<small>**KEY**: `📦 NEW`, `👌 IMPROVE`, `🐛 FIX`, `📖 DOC`, `🚀 RELEASE`, and `✅ TEST`

> _I use [Emoji-log](https://github.com/ahmadawais/Emoji-Log), you should try it and simplify your git commits._

</small>

Nothing's ever complete, so bear with me while we keep iterating towards a better future.

> ```html
> 'Coz every night I lie in bed
> The brightest colors fill my head
> A million dreams are keeping me awake
> I think of what the world could be
> A vision of the one I see
> A million dreams is all it's gonna take
> A million dreams for the world we're gonna make ...
> ```
> ... _listen to → [A million dreams!](https://www.youtube.com/watch?v=pSQk-4fddDI)_

<br>

[![📃](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/license.png)](./../../)

## License & Conduct

- MIT © [Ahmad Awais](https://twitter.com/MrAhmadAwais/)
- Logo by [Saqib Ameen](https://github.com/ahmadawais/gatsby-package-manager/issues/1)
- [Code of Conduct](code-of-conduct.md)
- [Contribute to `gatsby-package-manager`](contributing.md)

<br>

[![🙌](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/connect.png)](./../../)

## Connect

<div align="left">
    <p><a href="https://github.com/ahmadawais"><img alt="GitHub @AhmadAwais" align="center" src="https://img.shields.io/badge/GITHUB-gray.svg?colorB=6cc644&colorA=6cc644&style=flat" /></a>&nbsp;<small><strong>(follow)</strong> To stay up to date on free & open-source software</small></p>
    <p><a href="https://twitter.com/MrAhmadAwais/"><img alt="Twitter @MrAhmadAwais" align="center" src="https://img.shields.io/badge/TWITTER-gray.svg?colorB=1da1f2&colorA=1da1f2&style=flat" /></a>&nbsp;<small><strong>(follow)</strong> To get #OneDevMinute daily hot tips & trolls</small></p>
    <p><a href="https://www.youtube.com/AhmadAwais"><img alt="YouTube AhmadAwais" align="center" src="https://img.shields.io/badge/YOUTUBE-gray.svg?colorB=ff0000&colorA=ff0000&style=flat" /></a>&nbsp;<small><strong>(subscribe)</strong> To tech talks & #OneDevMinute videos</small></p>
    <p><a href="https://AhmadAwais.com/"><img alt="Blog: AhmadAwais.com" align="center" src="https://img.shields.io/badge/MY%20BLOG-gray.svg?colorB=4D2AFF&colorA=4D2AFF&style=flat" /></a>&nbsp;<small><strong>(read)</strong> In-depth & long form technical articles</small></p>
    <p><a href="https://www.linkedin.com/in/MrAhmadAwais/"><img alt="LinkedIn @MrAhmadAwais" align="center" src="https://img.shields.io/badge/LINKEDIN-gray.svg?colorB=0077b5&colorA=0077b5&style=flat" /></a>&nbsp;<small><strong>(connect)</strong> On the LinkedIn profile y'all</small></p>
</div>

<br>

[![👌](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/sponsor.png)](./../../)

## Sponsor

Me ([Ahmad Awais](https://twitter.com/mrahmadawais/)) and my incredible wife ([Maedah Batool](https://twitter.com/MaedahBatool/)) are two engineers who fell in love with open source and then with each other. You can read more [about me here](https://ahmadawais.com/about). If you or your company use any of my projects or like what I’m doing then consider backing me. I'm in this for the long run. An open-source developer advocate.

- 🌟  **$9.99/month (recommended)** ❯ [Two cups of Caffè latte (coffee) every month →](https://pay.paddle.com/checkout/540217)
- 🚀  **$99.99 (one-time sponsor)** ❯ [Support an hour of open-source code →](https://pay.paddle.com/checkout/515568)
- 🔰  **$49.99 (one-time sponsor)** ❯ [Support an hour of maintenance →](https://pay.paddle.com/checkout/527253)
- ☕️  **$9.99 (one-time sponsor)** ❯ [Lunch/coffee →](https://pay.paddle.com/checkout/527254)

<br>

Or you can back me by checking out my super fun video course. As developers, we spend over 200 Hrs/month with our code editors — it's only fair to learn your next editor deeply. This course will save you 15-20 hours every month.  <a href="https://vscode.pro/?utm_source=GitHubFOSS" target="_blank">Become a VSCode Power User</a> →</p>

<a href="https://vscode.pro/?utm_source=GitHubFOSS" target="_blank"><img src="https://raw.githubusercontent.com/ahmadawais/stuff/master/images/vscodepro/VSCode.jpeg" /><br><strong>VSCODE</strong></a>

<br>

[![VSCode](https://img.shields.io/badge/-VSCode.pro%20%E2%86%92-gray.svg?colorB=4D2AFF&style=flat)](https://VSCode.pro/?utm_source=GitHubFOSS)
[![Ahmad on Twitter](https://img.shields.io/twitter/follow/mrahmadawais.svg?style=social&label=Follow%20@MrAhmadAwais)](https://twitter.com/mrahmadawais/)
