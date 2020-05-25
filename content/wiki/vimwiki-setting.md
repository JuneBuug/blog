---
title   : 'vim-wiki 새 머신에서 세팅하는 법' 
slug  :  '/vimwiki'
layout  : wiki 
excerpt : 
date    : 2020-05-08 10:16:54 +0900
updated : 2020-05-25 15:51:53 +0900
tags    : 
  - vim
  - blog
---


## 왜 vimwiki인가? 

vim이라고 하면 굉장히 어려워보이고, 나에게는 아직도 굉장히 어렵다. 그럼에도 서버 개발자로 길을 시작한 이상 vim은 넘어야할 산이었다. 언제까지 마우스를 만지작하며 GUI 를 그리워할 것인가! 

더해, 블로그에 포스팅하기 어려운 자투리 지식 역시 기록하고 싶어졌다. 날로 약해지는 기억력을 보조하고, 일상적인 내용도 적기 위해서. 존경하는 개발자 리스트에 있는 [johngrib님](https://johngrib.github.io) 이 개발 외에도 수학, 일상 hacks 를 올리는 모습을 보고 감명받았다.  이 목적에는 블로그보다는 위키가 알맞았고 상기 블로그에 있는 글을 조금 변형하면 나의 이 gatsby blog에도 적용이 가능할 것 같았다. (굉장한 삽질이었지만)

결론적으로 딱 `블로그와 위키글 발행` 이라는 나의 목적에는 맞는 정도로 vimwiki 그리고 vim을 사용할 수 있게 되었고 앞으로 더욱 잘 알아갈 나의 vim life가 조금 기대가 된다. 오늘도 이 글을 쓰면서 `^` 명령어와 `$` 명령어의 사용법을 추가로 익혔으니까!

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
alis vi="nvim"
alis vimdiff="nvim -d"
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

```title=vimrc 
call plug#begin('~/.vim/plugged')
  Plug 'vimwiki/vimwiki'
  Plug 'mhinz/vim-startify'
call plug#end()
```

위와 같이 `call plug#begin('~/.vim/plugged')` 로 시작하여, 
`call plug#end()` 로 끝나는 섹션을 마련한다. 그 안에는 원하는 Plug를 적으면된다. Plug를 적고 나서 해당 Plug를 설치하기 위해서는 다시 `vim` 을 실행하여 esc + `:PlugInstall` 을 친다. 

### vimwiki와 vim-startify 설치 

## vimwiki 설정 추가


[vimrc gist](https://gist.github.com/JuneBuug/3749861b3f9404258b8bcbcd4aa9622d)
## 부록 : gatsby 블로그와 연결

### github-action.sh 




## 참고
[subicura님의 블로그](https://subicura.com/2017/11/22/mac-os-development-environment-setup.html#vim)
이 글은 mac 개발환경 구축에 대한 글인데 하나하나가 주옥같다. 글도 완전 잘쓰신다. subicura님 내적 존경합니다.

[johngrib님의 블로그](https://johngrib.github.io/wiki/my-wiki/)
모든 내용은 johngrib 님의 블로그에서 대부분 차용하고 참고했다. 역시 내적존경합니다. 

