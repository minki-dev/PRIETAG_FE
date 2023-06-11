/** @type {import('cz-git').UserConfig} */

module.exports = {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  prompt: {
    alias: { fd: "docs: fix typos" },
    
    messages: {
      type: "깃모지 선택~",
      subject: "커밋 제목을 적어주세요. \n",
      body: '상세 내용을 적어주세요. 줄 바꿈은 "/" 을 사용해주세요.\n',
      confirmCommit: "이대로 커밋 하시겠습니까? (Y/N)",
    },
    types: [
      { value: "feat",     name: "✨ feat:      기능", emoji: ":sparkles:" },
      { value: "conf",     name: "⚙️  conf:      환경설정", emoji: ":gear:" },
      { value: "init",     name: "🎉 init:      설치", emoji: ":tada:" },
      { value: "fix",      name: "🔨 fix:       버그 수정", emoji: ":hammer:" },
      { value: "refactor", name: "🏭 refactor:  리팩토링", emoji: ":factory:" },
      { value: "typo",     name: "✏️  typo:      오타 수정", emoji: ":pencil2:" },
      { value: "style",    name: "🗑️  style:     코드 스타일 개선", emoji: ":wastebasket:" },
      { value: "docs",     name: "🏳️  docs:      문서 추가/수정", emoji: ":white_flag:" },
      { value: "remove",   name: "🔥 remove:    코드/파일/패키지 제거", emoji: ":fire:" },
      { value: "comment",  name: "💡 comment:   주석 추가/수정", emoji: ":bulb:" },
      { value: "design",   name: "💄 design:    UI/스타일 추가/수정", emoji: ":lipstick:" },
      { value: "rename",   name: "🚚 rename:    리소스 이동, 이름 변경", emoji: ":truck:" },
      { value: "add",      name: "🔧 add:       구성 파일 추가", emoji: ":wrench:" },
      { value: "chore",    name: "📦 chore:     패키지 설치", emoji: ":package:" },
    ],
    useEmoji: true,
    emojiAlign: "left",
    useAI: false,
    themeColorCode: "",
    scopes: [],
    allowCustomScopes: false,
    allowEmptyScopes: true,
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    breaklineNumber: 80,
    breaklineChar: "/",
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: "",
    defaultSubject: "",
    customScope: false,
  }
};
