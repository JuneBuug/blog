---
title   : 'vim-wiki 새 머신에서 세팅하는 법' 
slug  :  '/vimwiki'
excerpt : 
date    : 2020-05-08 10:16:54 +0900
updated : 2021-08-17 12:16:39
tags    : 
  - Vim
  - Blog
---


## 왜 vimwiki인가? 

vim이라고 하면 굉장히 어려워보이고, 나에게는 아직도 굉장히 어렵다. 그럼에도 서버 개발자로 길을 시작한 이상 vim은 넘어야할 산이었다. 언제까지 마우스를 만지작하며 GUI 를 그리워할 것인가! 

더해, 블로그에 포스팅하기 어려운 자투리 지식 역시 기록하고 싶어졌다. 날로 약해지는 기억력을 보조하고, 일상적인 내용도 적기 위해서. 존경하는 개발자 리스트에 있는 [johngrib님](https://johngrib.github.io) 이 개발 외에도 수학, 일상 hacks 를 올리는 모습을 보고 감명받았다.  이 목적에는 블로그보다는 위키가 알맞았고 상기 블로그에 있는 글을 조금 변형하면 나의 이 gatsby blog에도 적용이 가능할 것 같았다. (굉장한 삽질이었지만)

결론적으로 딱 `블로그와 위키글 발행` 이라는  목적에 맞는 정도로 vimwiki 그리고 vim을 사용할 수 있게 되었다. 앞으로 성장밖에 남지 않은 (바닥이니까ㅎㅎ)  나의 vim life가 기대된다. 오늘도 이 글을 쓰면서 `^` 명령어와 `$` 명령어의 사용법을 추가로 익혔다 ㅋㅋ

vimwiki는 단어에 커서를 놓고 엔터를 입력하는 순간 `[[단어]]`의 형태로 링크와 새로운 파일이 생성된다. 간단하게 기록을 이어나갈 수 있으므로 큰 장점이 있다. 


## vim 세팅하기  
나는 OS X 환경에서 진행했다. OS X 환경에서는 vim이 내장되어있고, 따로 설치할 필요가 없다.  다만 neovim (vim 보다 더 좋다고 한다. 오래된 vim 소스를 다시 짰다던가.) 을 추가로 설치하고, 이를 기본 vim으로 설정할 수는 있다. 

### homebrew로 neovim 설치 

homebrew가 없는 경우 아래 커맨드로 간단하게 설치한다. 
```bash 
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

있는 경우 바로 neovim 설치로 넘어간다.

```bash 
brew install neovim
```
본인이 사용하고 있는 shell이 기본(bash)라면 bashrc에, oh-my-zsh이라면 zshrc에 설정을 입력한다. 

```bash 
vi ~/.zshrc # zshrc 오픈 (bash인경우 vi ~/.bashrc) 
# 아래 설정을 입력
alias vim="nvim"
alias vi="nvim"
alias vimdiff="nvim -d"
export EDITOR="/usr/local/bin/nvim"
```

### vim-plug 설치 

vim 패키지 매니저로 자주 쓰이는 vim plug를 설치한다. 
[레포](https://github.com/junegunn/vim-plug)

```bash
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

vim의 모든 설정은 `~/.vimrc`, 즉 홈디렉토리에 있는 `.vimrc` 파일에 적으면된다. vimplug을 깔았으니, plugin들을 정의해줄 섹션을 vimrc 파일에 마련해준다. 

```bash
call plug#begin('~/.vim/plugged')
  Plug 'vimwiki/vimwiki'
  Plug 'mhinz/vim-startify'
call plug#end()
```

위와 같이 `call plug#begin('~/.vim/plugged')` 로 시작하여, 
`call plug#end()` 로 끝나는 섹션을 마련한다. 그 안에는 원하는 Plug를 적으면된다. Plug를 적고 나서 해당 Plug를 설치하기 위해서는 다시 `vim` 을 실행하여 esc + `:PlugInstall` 을 친다. 

### vimwiki와 vim-startify 설치 

위에서 보인것 과 같이 Plug 섹션 하단에 `Plug 'vimwiki/vimwiki'` 와 `Plug 'mhinz/vim-startify'`를 입력한다. 
그리고 vim에 들어가 PlugInstall을 입력. 

```bash 
vim
:PlugInstall
```
그러면 해당하는 플러그인이 설치된다.

## vimwiki 설정 추가

이제 위키로 설정할 레포지토리를 정해준다.
```bash 
let maplocalleader = "\\"

let g:vimwiki_list = [
  \{
  \'path': '~/Desktop/blog/content/wiki',
  \'ext': '.md',
  \'diary_rel_path': '.',
  \},
  \]

let g:vimwiki_conceallevel = 0

command! WikiIndex :VimWikiIndex
nmap <LocalLeader>ww <Plug>VimwikiIndex
nmap <LocalLeader>tt <Plug>VimwikiToggleListItem

```

**vimwiki_list** 뒤로 지정해주면 되는데, 나의 경우 경로는 `~/Desktop/blog/content/wiki` 이고, 형식은 md 파일이다. 

vimwiki는 index파일을 기본으로 생성하는데, 여기에서 문서를 쭉쭉 뻗어나가면 된다. 
![위키](./scrn.png) 
이 인덱스 파일로 빨리 이동하기 위해서 단축키를 매핑해준다. 
참고한 블로그대로 `\\` (localLeader) + 에 `ww` 를 입력하면 바로 VimwikiIndex로 이동하는 단축키를 적용했다. 

`vimrc` 파일 풀버전은 아래 gist에서 볼 수 있다.
[vimrc gist](https://gist.github.com/JuneBuug/3749861b3f9404258b8bcbcd4aa9622d)

## 부록 : gatsby 블로그와 연결

gatsby 블로그의 content 폴더 하위에 wiki를 폴더를 만들고, 이를 vimwiki 경로로 지정했다. 
실제로 퍼블리싱되는 글은 `폴더/index.mdx` 형태로 나와야하기때문에, git hook을 사용해서 여태 wiki 폴더에 작성된 글 (`.md`파일) 형태 -> `폴더/index.mdx` 로 변환하는 스크립트를 실행하도록했다. 

```bash 
#! /bin/bash

for file in content/wiki/*
do
    if [[ $file == *.md && $file != *'index.md' ]] 

    then 
        echo $file
        mkdir ${file%%.*} 
        cp $file ${file%%.*}/index.mdx 
    fi
done
```

2021년 7월 4일 추가. 
이 부분을 항상 `git hook` 을 이용해서 pre-commit hook 으로 작동하도록 했었다. 즉, `.git/hooks/pre-commit` 파일에 

```bash 
#!/bin/bash
sh ./github-action.sh
git add .
```
이렇게 추가해서 넣어주었음. 그리고 pre-commit 파일에 `chmod +x pre-commit` 커맨드를 통해서 실행 가능한 상태로 만들어준다. 

그러면 딱히 신경쓰지 않아도 커밋 이전의 시점에 md-> mdx 과정이 실행된다. 레포를 새로 받고 왜 안올라가지 의문을 가진 나에게.. 보내는 ! 메모. 

### m1 에서 node 버전 
node 버전 10에서는 정상 작동한다. (+rosetta iterm) 
12 이상에서는 계속 시도해보았으나 네이티브 / 로제타 다 정상작동하지 않았음. 

## 참고
[subicura님의 블로그](https://subicura.com/2017/11/22/mac-os-development-environment-setup.html#vim)
이 글은 mac 개발환경 구축에 대한 글인데 하나하나가 주옥같다. 글도 완전 잘쓰신다. subicura님 내적 존경합니다.

[johngrib님의 블로그](https://johngrib.github.io/wiki/my-wiki/)
모든 내용은 johngrib 님의 블로그에서 대부분 차용하고 참고했다. 역시 내적존경합니다. 


