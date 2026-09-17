/**
 * @name SystemWindow
 * @description Styles Discord messages as Solo Leveling System windows — codeblock-style grouped containers. Purple for your messages (Monarch), blue for others (System).
 * @version 2.6.0
 * @author matthewqilanthompson
 * @source https://github.com/matthewqilanthompson/betterdiscord-assets
 */
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/shared/discord-classes.js
var require_discord_classes = __commonJS({
  "src/shared/discord-classes.js"(exports2, module2) {
    var { Webpack } = BdApi;
    var _resolved = false;
    var _cls = {};
    var _sel = {};
    var _fb = {};
    var DEFS = {
      // Layout / Panels
      chatContent: [["chatContent"], "chatContent", '[class*="chatContent_"]'],
      sidebar: [["sidebar"], "sidebar", '[class*="sidebar_"]'],
      sidebarList: [["sidebar", "sidebarList"], "sidebarList", '[class*="sidebar_"]'],
      membersWrap: [["membersWrap"], "membersWrap", '[class*="membersWrap_"]'],
      members: [["membersWrap"], "members", '[class*="members_"]'],
      container: [["membersWrap"], "container", '[class*="container_"]'],
      privateChannels: [["privateChannels"], "privateChannels", '[class*="privateChannels_"]'],
      userProfileOuter: [["userProfileOuter"], "userProfileOuter", '[class*="userProfileOuter_"]'],
      searchResultsWrap: [["searchResultsWrap"], "searchResultsWrap", '[class*="searchResultsWrap_"]'],
      // Scrolling
      scroller: [["scroller", "thin"], "scroller", '[class*="scroller_"]'],
      scrollerBase: [["scrollerBase"], "scrollerBase", '[class*="scrollerBase_"]'],
      thin: [["scroller", "thin"], "thin", '[class*="thin_"]'],
      // Messages
      messageListItem: [["messageListItem"], "messageListItem", '[class*="messageListItem_"]'],
      message: [["message", "groupStart"], "message", '[class*="message_"]'],
      groupStart: [["message", "groupStart"], "groupStart", '[class*="groupStart_"]'],
      cozy: [["message", "cozy"], "cozy", '[class*="cozy_"]'],
      messageContent: [["messageContent"], "messageContent", '[class*="messageContent_"]'],
      markup: [["markup"], "markup", '[class*="markup_"]'],
      mentioned: [["mentioned"], "mentioned", '[class*="mentioned_"]'],
      // Message parts
      author: [null, "author", '[class*="author_"]'],
      username: [["username"], "username", '[class*="username_"]'],
      timestamp: [["timestamp"], "timestamp", '[class*="timestamp_"]'],
      avatar: [["avatar", "wrapper"], "avatar", '[class*="avatar_"]'],
      repliedMessage: [["repliedMessage"], "repliedMessage", '[class*="repliedMessage_"]'],
      embed: [["embed"], "embed", '[class*="embed_"]'],
      attachment: [["attachment"], "attachment", '[class*="attachment_"]'],
      embedWrapper: [["embedWrapper"], "embedWrapper", '[class*="embedWrapper_"]'],
      botTag: [["botTag"], "botTag", '[class*="botTag_"]'],
      // Header / Toolbar
      toolbar: [["updateIconForeground", "search", "toolbar"], "toolbar", '[class*="toolbar_"]'],
      titleWrapper: [["titleWrapper"], "titleWrapper", '[class*="titleWrapper_"]'],
      title: [["title", "lineClamp"], "title", '[class*="title_"]'],
      channelHeader: [["channelHeader"], "channelHeader", '[class*="channelHeader_"]'],
      // Input / Composer
      channelTextArea: [["channelTextArea"], "channelTextArea", '[class*="channelTextArea_"]'],
      textContainer: [["textContainer"], "textContainer", '[class*="textContainer_"]'],
      slateContainer: [["slateContainer"], "slateContainer", '[class*="slateContainer_"]'],
      editor: [["editor"], "editor", '[class*="editor_"]'],
      channelBottomBarArea: [["channelBottomBarArea"], "channelBottomBarArea", '[class*="channelBottomBarArea_"]'],
      scrollableContainer: [["scrollableContainer"], "scrollableContainer", '[class*="scrollableContainer_"]'],
      inner: [["inner"], "inner", '[class*="inner_"]'],
      // User panel / profile
      user: [["user"], "user", '[class*="user_"]'],
      nameTag: [["nameTag"], "nameTag", '[class*="nameTag_"]'],
      withTagAsButton: [["withTagAsButton"], "withTagAsButton", '[class*="withTagAsButton_"]'],
      panelSubtextContainer: [["panelSubtextContainer"], "panelSubtextContainer", '[class*="panelSubtextContainer_"]'],
      panelTitleContainer: [["panelTitleContainer"], "panelTitleContainer", '[class*="panelTitleContainer_"]'],
      // App layout
      base: [["base", "content"], "base", '[class*="base_"]'],
      content: [["base", "content"], "content", '[class*="content_"]'],
      layers: [["layers"], "layers", '[class*="layers_"]'],
      chat: [["chat"], "chat", '[class*="chat_"]'],
      chatLayerWrapper: [["chatLayerWrapper"], "chatLayerWrapper", '[class*="chatLayerWrapper_"]'],
      layerContainer: [["layerContainer"], "layerContainer", '[class*="layerContainer_"]'],
      panels: [["panels"], "panels", '[class*="panels_"]'],
      // Settings
      userSettings: [["standardSidebarView"], "standardSidebarView", '[class*="userSettings_"]'],
      standardSidebarView: [["standardSidebarView"], "standardSidebarView", '[class*="standardSidebarView_"]'],
      settingsContainer: [["settingsContainer"], "settingsContainer", '[class*="settingsContainer_"]'],
      searchBar: [["searchBar"], "searchBar", '[class*="searchBar_"]'],
      privateChannelsHeaderContainer: [["privateChannelsHeaderContainer"], "privateChannelsHeaderContainer", '[class*="privateChannelsHeaderContainer_"]'],
      // Messages (extended)
      messageList: [["messageList"], "messageList", '[class*="messageList_"]'],
      messageContainer: [["messageContainer"], "messageContainer", '[class*="messageContainer_"]'],
      messageGroupWrapper: [["messageGroupWrapper"], "messageGroupWrapper", '[class*="messageGroupWrapper_"]'],
      messages: [["messages"], "messages", '[class*="messages_"]'],
      messagesWrapper: [["messagesWrapper"], "messagesWrapper", '[class*="messagesWrapper_"]'],
      scrollerInner: [["scrollerInner"], "scrollerInner", '[class*="scrollerInner_"]'],
      systemMessage: [["systemMessage"], "systemMessage", '[class*="systemMessage_"]'],
      headerText: [["headerText"], "headerText", '[class*="headerText_"]'],
      // Guilds / Dock
      guilds: [["guilds", "wrapper"], "guilds", '[class*="guilds_"]'],
      wrapper: [["guilds", "wrapper"], "wrapper", '[class*="wrapper_"]'],
      // Forms / Composer
      form: [["form"], "form", '[class*="form_"]'],
      textArea: [["textArea"], "textArea", '[class*="textArea_"]'],
      slateTextArea: [["slateTextArea"], "slateTextArea", '[class*="slateTextArea_"]'],
      // Alerts / Badges / UI
      button: [["button"], "button", '[class*="button_"]'],
      listItem: [["listItem"], "listItem", '[class*="listItem_"]'],
      numberBadge: [["numberBadge"], "numberBadge", '[class*="numberBadge_"]'],
      mentionsBadge: [["mentionsBadge"], "mentionsBadge", '[class*="mentionsBadge_"]'],
      pill: [["pill"], "pill", '[class*="pill_"]'],
      // Probed 2026-03-13 (8 new stems)
      app: [null, "app", '[class*="app_"]'],
      bot: [["bot"], "bot", '[class*="bot_"]'],
      botText: [["botText"], "botText", '[class*="botText_"]'],
      channel: [["channel"], "channel", '[class*="channel_"]'],
      header: [["header"], "header", '[class*="header_"]'],
      name: [null, "name", '[class*="name_"]'],
      text: [["text"], "text", '[class*="text_"]'],
      thread: [["thread"], "thread", '[class*="thread_"]']
    };
    function _resolve() {
      const moduleCache = /* @__PURE__ */ new Map();
      for (const [name, [filterKeys, prop, fallback]] of Object.entries(DEFS)) {
        _fb[name] = fallback;
        let mod;
        if (filterKeys === null) {
          try {
            mod = Webpack.getModule(
              (m) => (m == null ? void 0 : m[prop]) && typeof m[prop] === "string" && /^\w+_\w{4,}/.test(m[prop])
            ) || null;
          } catch (_) {
            mod = null;
          }
        } else {
          const cacheKey = filterKeys.join("|");
          mod = moduleCache.get(cacheKey);
          if (mod === void 0) {
            try {
              mod = Webpack.getByKeys(...filterKeys) || null;
            } catch (_) {
              mod = null;
            }
            moduleCache.set(cacheKey, mod);
          }
        }
        const cls2 = mod == null ? void 0 : mod[prop];
        if (cls2 && typeof cls2 === "string" && !cls2.includes(" ")) {
          _cls[name] = cls2;
          _sel[name] = `.${cls2}`;
        } else {
          _cls[name] = "";
          _sel[name] = fallback;
        }
      }
      _resolved = true;
    }
    var sel = new Proxy(_sel, {
      get(target, prop) {
        if (!_resolved) _resolve();
        return target[prop];
      }
    });
    var cls = new Proxy(_cls, {
      get(target, prop) {
        if (!_resolved) _resolve();
        return target[prop];
      }
    });
    var fb = new Proxy(_fb, {
      get(target, prop) {
        if (!_resolved) _resolve();
        return target[prop];
      }
    });
    function refresh() {
      _resolved = false;
      _resolve();
    }
    function isResolved(name) {
      if (!_resolved) _resolve();
      return !!_cls[name];
    }
    function cssSelector(name, prefix = "", suffix = "") {
      if (!_resolved) _resolve();
      return `${prefix}${_sel[name]}${suffix}`;
    }
    function query(root, name) {
      if (!_resolved) _resolve();
      if (_cls[name]) {
        const el = root.querySelector(`.${_cls[name]}`);
        if (el) return el;
      }
      return root.querySelector(_fb[name]);
    }
    function queryAll(root, name) {
      if (!_resolved) _resolve();
      if (_cls[name]) {
        const list = root.querySelectorAll(`.${_cls[name]}`);
        if (list.length) return list;
      }
      return root.querySelectorAll(_fb[name]);
    }
    module2.exports = { sel, cls, fb, refresh, isResolved, cssSelector, query, queryAll };
  }
});

// src/SystemWindow/build-styles.js
var require_build_styles = __commonJS({
  "src/SystemWindow/build-styles.js"(exports2, module2) {
    var dc = require_discord_classes();
    function buildCSS2() {
      const messageListItem = dc.sel.messageListItem;
      const mentioned = dc.sel.mentioned;
      const mentionedPreStyle = dc.cls.mentioned ? `
/* Mentioned messages pre-style (CSS-only, exact-class :has argument) */
li${messageListItem}:has(div${mentioned}) {
  border-left-color: rgba(251, 191, 36, 0.7) !important;
  border-right-color: rgba(251, 191, 36, 0.25) !important;
  border-top-color: rgba(251, 191, 36, 0.25) !important;
  border-bottom-color: rgba(251, 191, 36, 0.25) !important;
  background: rgba(251, 191, 36, 0.08) !important;
}
` : `
/* Mentioned pre-style SKIPPED: webpack lookup fell back to a substring
   selector \u2014 a substring :has() argument on the message list is too
   expensive. JS classification (li.sw-mentioned) covers mentions. */
`;
      const avatar = dc.sel.avatar;
      const username = dc.sel.username;
      const timestamp = dc.sel.timestamp;
      const repliedMessage = dc.sel.repliedMessage;
      const embedWrapper = dc.sel.embedWrapper;
      const message = dc.sel.message;
      return `/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   SystemWindow v2.5.0 \u2014 LI-level codeblock wrapping
   Wraps avatar + username + timestamp + message text

   Colors:
     BLUE:   59, 130, 246  (#3b82f6) \u2014 System (others)
     PURPLE: 138, 43, 226  (#8a2be2) \u2014 Monarch (self)
     GOLD:   251, 191, 36  (#fbbf24) \u2014 Mentioned (you / replies-to-you)
     BG:     rgba(0, 0, 0, 0.55) \u2014 Darker codeblock background
     R:      2px \u2014 Border radius
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   PRE-STYLE: CSS-only base applied to ALL message
   items BEFORE JS classification. Prevents the flash
   when Discord replaces DOM nodes on re-render.
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

li${messageListItem} {
  background: rgba(0, 0, 0, 0.55) !important;
  border-left: 3px solid rgba(59, 130, 246, 0.5) !important;
  border-right: 1px solid rgba(59, 130, 246, 0.2) !important;
  border-top: 1px solid rgba(59, 130, 246, 0.2) !important;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2) !important;
  border-radius: 2px !important;
  position: relative !important;
  margin-left: 48px !important;
  margin-right: 96px !important;
  margin-top: 4px !important;
  margin-bottom: 4px !important;
  padding: 4px 12px 8px 8px !important;
  /* PERF (2026-07-13): no transition on the li itself. The hover glow now
     lives on a ::after overlay whose OPACITY transitions (compositor-only)
     \u2014 transitioning box-shadow here repainted the full 40px glow region
     every frame for 200ms on every hover enter/leave while reading. */
}

/* Hover glow overlay: shadow is pre-declared, invisible at opacity 0, and
   only the opacity animates \u2014 compositor-only, zero paint per frame.
   z-index:-1 keeps it behind the li's own background; pointer-events:none
   keeps hover targeting unchanged. The old barely-visible inset component
   (0.1 alpha) is dropped \u2014 an overlay can't render inside-glow without
   tinting the content. */
li${messageListItem}::after {
  content: "" !important;
  position: absolute !important;
  inset: -1px !important;
  border-radius: inherit !important;
  pointer-events: none !important;
  z-index: -1 !important;
  opacity: 0 !important;
  transition: opacity 200ms ease !important;
  box-shadow: 0 0 18px rgba(59, 130, 246, 0.45),
              0 0 40px rgba(59, 130, 246, 0.15) !important;
}

li.sw-self::after {
  box-shadow: 0 0 20px rgba(138, 43, 226, 0.6),
              0 0 45px rgba(138, 43, 226, 0.25) !important;
}

li.sw-mentioned::after {
  box-shadow: 0 0 18px rgba(251, 191, 36, 0.5),
              0 0 40px rgba(251, 191, 36, 0.2) !important;
}

li${messageListItem}:hover::after {
  opacity: 1 !important;
}
${mentionedPreStyle}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   BASE: Classified messages (JS-applied)
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

li.sw-group-solo,
li.sw-group-start,
li.sw-group-middle,
li.sw-group-end {
  background: rgba(0, 0, 0, 0.55) !important;
  border-left: 3px solid rgba(59, 130, 246, 0.5) !important;
  border-right: 1px solid rgba(59, 130, 246, 0.2) !important;
  position: relative !important;
  margin-left: 48px !important;
  margin-right: 96px !important;
  padding: 4px 12px 8px 8px !important;
  /* PERF: see note above \u2014 hover glow lives on the ::after overlay. */
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   SOLO: Full border + full radius
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

li.sw-group-solo {
  border-top: 1px solid rgba(59, 130, 246, 0.2) !important;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2) !important;
  border-radius: 2px !important;
  margin-top: 12px !important;
  margin-bottom: 12px !important;
  padding-bottom: 10px !important;
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   GROUP START: Top border + top radius
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

li.sw-group-start {
  border-top: 1px solid rgba(59, 130, 246, 0.2) !important;
  border-bottom: none !important;
  border-radius: 2px 2px 0 0 !important;
  margin-top: 12px !important;
  margin-bottom: 0 !important;
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   GROUP MIDDLE: Side borders only
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

li.sw-group-middle {
  border-top: none !important;
  border-bottom: none !important;
  border-radius: 0 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   GROUP END: Bottom border + bottom radius
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

li.sw-group-end {
  border-top: none !important;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2) !important;
  border-radius: 0 0 2px 2px !important;
  margin-top: 0 !important;
  margin-bottom: 12px !important;
  padding-bottom: 10px !important;
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   SELF: Purple accent (Monarch)
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

li.sw-self {
  border-left-color: rgba(138, 43, 226, 0.5) !important;
  border-right-color: rgba(138, 43, 226, 0.2) !important;
}

li.sw-self.sw-group-solo,
li.sw-self.sw-group-start {
  border-top-color: rgba(138, 43, 226, 0.2) !important;
}

li.sw-self.sw-group-solo,
li.sw-self.sw-group-end {
  border-bottom-color: rgba(138, 43, 226, 0.2) !important;
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   HOVER: Glow on the codeblock
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

/* Glow itself comes from the ::after overlay (opacity transition, defined
   in the pre-style section \u2014 it covers classified groups too since they're
   the same li elements). Here: only the instant border accent. */
li.sw-group-solo:hover,
li.sw-group-start:hover,
li.sw-group-middle:hover,
li.sw-group-end:hover {
  border-left-color: rgba(59, 130, 246, 1) !important;
}

li.sw-self.sw-group-solo:hover,
li.sw-self.sw-group-start:hover,
li.sw-self.sw-group-middle:hover,
li.sw-self.sw-group-end:hover {
  border-left-color: rgba(138, 43, 226, 1) !important;
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   AVATAR: Clean circle inside codeblock
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

li.sw-group-solo ${avatar},
li.sw-group-start ${avatar} {
  z-index: 1 !important;
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   USERNAMES: System label feel
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

li.sw-group-solo ${username},
li.sw-group-start ${username} {
  letter-spacing: 0.03em !important;
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   TIMESTAMPS: Subtle metadata
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

li.sw-group-solo time, li.sw-group-start time,
li.sw-group-middle time, li.sw-group-end time,
li.sw-group-solo ${timestamp},
li.sw-group-start ${timestamp},
li.sw-group-middle ${timestamp},
li.sw-group-end ${timestamp} {
  opacity: 0.6 !important;
  font-size: 0.68rem !important;
  transition: opacity 200ms ease !important;
}

li.sw-group-solo:hover time, li.sw-group-start:hover time,
li.sw-group-middle:hover time, li.sw-group-end:hover time,
li.sw-group-solo:hover ${timestamp},
li.sw-group-start:hover ${timestamp},
li.sw-group-middle:hover ${timestamp},
li.sw-group-end:hover ${timestamp} {
  opacity: 0.8 !important;
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   REPLY BLOCKS: Nested mini-codeblock
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

li.sw-group-solo ${repliedMessage},
li.sw-group-start ${repliedMessage} {
  background: rgba(0, 0, 0, 0.25) !important;
  border: 1px solid rgba(59, 130, 246, 0.15) !important;
  border-left: 2px solid rgba(59, 130, 246, 0.3) !important;
  border-radius: 2px !important;
  padding: 4px 8px !important;
  margin-bottom: 4px !important;
}

li.sw-self.sw-group-solo ${repliedMessage},
li.sw-self.sw-group-start ${repliedMessage} {
  border-color: rgba(138, 43, 226, 0.15) !important;
  border-left-color: rgba(138, 43, 226, 0.3) !important;
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   EMBEDS: Codeblock accent
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

li.sw-group-solo ${embedWrapper},
li.sw-group-start ${embedWrapper},
li.sw-group-middle ${embedWrapper},
li.sw-group-end ${embedWrapper} {
  background: rgba(0, 0, 0, 0.25) !important;
  border: 1px solid rgba(59, 130, 246, 0.15) !important;
  border-left: 2px solid rgba(59, 130, 246, 0.3) !important;
  border-radius: 2px !important;
}

li.sw-self ${embedWrapper} {
  border-color: rgba(138, 43, 226, 0.15) !important;
  border-left-color: rgba(138, 43, 226, 0.3) !important;
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   MENTIONED: Gold "Emergency Quest" accent \u2014 high contrast vs the
   blue (others) and purple (self) palette so an @-ping or reply-to-you
   reads at a glance even mid-scroll.
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

li.sw-mentioned {
  border-left-color: rgba(251, 191, 36, 0.7) !important;
  border-right-color: rgba(251, 191, 36, 0.25) !important;
  background: rgba(251, 191, 36, 0.08) !important;
}

li.sw-mentioned.sw-group-solo,
li.sw-mentioned.sw-group-start {
  border-top-color: rgba(251, 191, 36, 0.25) !important;
}

li.sw-mentioned.sw-group-solo,
li.sw-mentioned.sw-group-end {
  border-bottom-color: rgba(251, 191, 36, 0.25) !important;
}

/* Kill the theme's mention bg + ::before bar inside codeblocks */
li.sw-mentioned div${mentioned} {
  background: transparent !important;
}
li.sw-mentioned div${mentioned}::before {
  display: none !important;
}

/* Kill Discord's native message hover highlight inside codeblocks */
li.sw-group-solo div${message}:hover,
li.sw-group-start div${message}:hover,
li.sw-group-middle div${message}:hover,
li.sw-group-end div${message}:hover,
li.sw-group-solo div[role="article"]:hover,
li.sw-group-start div[role="article"]:hover,
li.sw-group-middle div[role="article"]:hover,
li.sw-group-end div[role="article"]:hover {
  background: transparent !important;
}

/* Mentioned hover: gold border accent (glow via ::after overlay). */
li.sw-mentioned.sw-group-solo:hover,
li.sw-mentioned.sw-group-start:hover,
li.sw-mentioned.sw-group-middle:hover,
li.sw-mentioned.sw-group-end:hover {
  border-left-color: rgba(251, 191, 36, 1) !important;
}
`;
    }
    module2.exports = { buildCSS: buildCSS2 };
  }
});

// src/shared/bd-module-loader.js
var require_bd_module_loader = __commonJS({
  "src/shared/bd-module-loader.js"(exports2, module2) {
    function loadBdModuleFromPlugins2(fileName) {
      if (!fileName) return null;
      try {
        const fs = require("fs");
        const path = require("path");
        const source = fs.readFileSync(path.join(BdApi.Plugins.folder, fileName), "utf8");
        const moduleObj = { exports: {} };
        const factory = new Function(
          "module",
          "exports",
          "require",
          "BdApi",
          `${source}
return module.exports || exports || null;`
        );
        const loaded = factory(moduleObj, moduleObj.exports, require, BdApi);
        const candidate = loaded || moduleObj.exports;
        if (typeof candidate === "function") return candidate;
        if (candidate && typeof candidate === "object" && Object.keys(candidate).length > 0) {
          return candidate;
        }
      } catch (_) {
      }
      return null;
    }
    module2.exports = {
      loadBdModuleFromPlugins: loadBdModuleFromPlugins2
    };
  }
});

// src/shared/toast.js
var require_toast = __commonJS({
  "src/shared/toast.js"(exports2, module2) {
    function createToast2() {
      return (message, type = "info", timeout) => {
        const opts = { type: type === "level-up" ? "info" : type };
        if (typeof timeout === "number" && timeout > 0) opts.timeout = timeout;
        BdApi.UI.showToast(message, opts);
      };
    }
    module2.exports = { createToast: createToast2 };
  }
});

// src/shared/settings.js
var require_settings = __commonJS({
  "src/shared/settings.js"(exports2, module2) {
    function loadSettings2(pluginId, defaults, key = "settings") {
      try {
        return { ...defaults, ...BdApi.Data.load(pluginId, key) || {} };
      } catch (err) {
        console.error(`[SL:settings] load failed for ${pluginId}/${key} \u2014 using defaults:`, err);
        return { ...defaults };
      }
    }
    function saveSettings2(pluginId, settings, key = "settings") {
      try {
        BdApi.Data.save(pluginId, key, settings);
      } catch (err) {
        console.error(`[SL:settings] save FAILED for ${pluginId}/${key}:`, err);
      }
    }
    module2.exports = { loadSettings: loadSettings2, saveSettings: saveSettings2 };
  }
});

// src/SystemWindow/index.js
var { buildCSS } = require_build_styles();
var { loadBdModuleFromPlugins } = require_bd_module_loader();
var { createToast } = require_toast();
var { loadSettings, saveSettings } = require_settings();
var SCROLLER_SELECTOR = '[role="list"][class*="scrollerInner_"]';
var MSG_LI_SELECTOR = 'li[class*="messageListItem_"]';
var _PluginUtils;
try {
  _PluginUtils = loadBdModuleFromPlugins("BetterDiscordPluginUtils.js");
} catch (_) {
  _PluginUtils = null;
}
var SW_POS_CLASSES = ["sw-group-solo", "sw-group-start", "sw-group-middle", "sw-group-end"];
module.exports = class SystemWindow {
  constructor() {
    this._STYLE_ID = "system-window-css";
    this._defaultSettings = {
      enabled: true,
      debugMode: false
    };
    this.settings = structuredClone(this._defaultSettings);
    this._observer = null;
    this._selChannelStore = null;
    this._selChannelListener = null;
    this._userListener = null;
    this._throttleTimer = null;
    this._lastScrollerEl = null;
    this._classifyRAF = null;
    this._classifyVersion = 1;
    this._started = false;
    this._articleCache = /* @__PURE__ */ new WeakMap();
    this._onVisibility = null;
  }
  /* ═══════════════════════════════════════════════
     §1  Lifecycle
     ═══════════════════════════════════════════════ */
  start() {
    var _a, _b, _c;
    if (this._started) {
      this.stop();
    }
    this._toast = ((_a = _PluginUtils == null ? void 0 : _PluginUtils.createToastHelper) == null ? void 0 : _a.call(_PluginUtils, "systemWindow")) || createToast();
    this.settings = loadSettings("SystemWindow", this._defaultSettings);
    try {
      this._UserStore = BdApi.Webpack.getStore("UserStore");
      this._currentUserId = ((_c = (_b = this._UserStore) == null ? void 0 : _b.getCurrentUser()) == null ? void 0 : _c.id) || null;
    } catch (e) {
      this._UserStore = null;
      this._currentUserId = null;
    }
    if (this.settings.enabled) {
      this._injectCSS();
      this._attachObserver();
    }
    this._started = true;
    this._toast("SystemWindow active", "success", 2e3);
  }
  stop() {
    BdApi.DOM.removeStyle(this._STYLE_ID);
    this._detachObserver();
    this._cleanupClasses();
    this._currentUserId = null;
    this._started = false;
  }
  /* ═══════════════════════════════════════════════
     §2  Observer — Classify message groups
     ═══════════════════════════════════════════════ */
  _attachObserver() {
    var _a, _b;
    this._detachObserver();
    this._findAndObserve();
    if (_PluginUtils == null ? void 0 : _PluginUtils.NavigationBus) {
      this._navBusUnsub = _PluginUtils.NavigationBus.subscribe(() => this._checkChannelSwitch());
    }
    try {
      const SelectedChannelStore = (_b = (_a = BdApi.Webpack).getStore) == null ? void 0 : _b.call(_a, "SelectedChannelStore");
      if (SelectedChannelStore && typeof SelectedChannelStore.addChangeListener === "function") {
        this._selChannelListener = () => this._checkChannelSwitch();
        SelectedChannelStore.addChangeListener(this._selChannelListener);
        this._selChannelStore = SelectedChannelStore;
      }
      if (this._UserStore && typeof this._UserStore.addChangeListener === "function") {
        this._userListener = () => this._checkChannelSwitch();
        this._UserStore.addChangeListener(this._userListener);
      }
    } catch (_) {
    }
    this._onVisibility = () => {
      if (!document.hidden) {
        this._classifyVersion += 1;
        this._classifyMessages();
      }
    };
    document.addEventListener("visibilitychange", this._onVisibility);
  }
  _checkChannelSwitch() {
    var _a, _b;
    try {
      const currentId = ((_b = (_a = this._UserStore) == null ? void 0 : _a.getCurrentUser()) == null ? void 0 : _b.id) || null;
      if (currentId && currentId !== this._currentUserId) {
        this._currentUserId = currentId;
        document.querySelectorAll('div[role="article"][data-sw-self]').forEach((el) => el.removeAttribute("data-sw-self"));
        this._classifyVersion += 1;
        this._classifyMessages();
      }
    } catch (_) {
    }
    const scroller = document.querySelector(SCROLLER_SELECTOR);
    if (!scroller) return;
    if (scroller !== this._lastScrollerEl) {
      this._lastScrollerEl = scroller;
      this._classifyVersion += 1;
      this._observeScroller(scroller);
      this._classifyMessages();
      if (this.settings.debugMode) {
        console.log("[SystemWindow] Channel switch detected \u2014 re-classified");
      }
    }
  }
  _findAndObserve(retryCount = 0) {
    const scroller = document.querySelector(SCROLLER_SELECTOR);
    if (scroller) {
      this._lastScrollerEl = scroller;
      this._classifyVersion += 1;
      this._observeScroller(scroller);
      this._classifyMessages();
    } else if (retryCount < 10) {
      this._findRetryTimer = setTimeout(() => {
        if (this.settings.enabled) this._findAndObserve(retryCount + 1);
      }, 2e3);
    }
  }
  _observeScroller(scroller) {
    if (this._observer) this._observer.disconnect();
    this._observer = new MutationObserver(() => this._throttledClassify());
    this._observer.observe(scroller, { childList: true });
  }
  _detachObserver() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    if (this._selChannelStore && this._selChannelListener) {
      try {
        this._selChannelStore.removeChangeListener(this._selChannelListener);
      } catch (_) {
      }
      this._selChannelStore = null;
      this._selChannelListener = null;
    }
    if (this._UserStore && this._userListener) {
      try {
        this._UserStore.removeChangeListener(this._userListener);
      } catch (_) {
      }
      this._userListener = null;
    }
    if (this._findRetryTimer) {
      clearTimeout(this._findRetryTimer);
      this._findRetryTimer = null;
    }
    if (this._navBusUnsub) {
      this._navBusUnsub();
      this._navBusUnsub = null;
    }
    if (this._onVisibility) {
      document.removeEventListener("visibilitychange", this._onVisibility);
      this._onVisibility = null;
    }
    if (this._classifyRAF) {
      cancelAnimationFrame(this._classifyRAF);
      this._classifyRAF = null;
    }
    clearTimeout(this._throttleTimer);
    this._throttleTimer = null;
    this._lastScrollerEl = null;
  }
  _throttledClassify() {
    if (document.hidden) return;
    if (this._throttleTimer) return;
    this._throttleTimer = setTimeout(() => {
      this._throttleTimer = null;
      if (this._classifyRAF) cancelAnimationFrame(this._classifyRAF);
      this._classifyRAF = requestAnimationFrame(() => {
        this._classifyRAF = null;
        this._classifyMessages();
      });
    }, 150);
  }
  /* ═══════════════════════════════════════════════
     §3  Message Classification
     ═══════════════════════════════════════════════ */
  _getGroupSelfFlag(firstArticle) {
    if (firstArticle.hasAttribute("data-sw-self")) {
      return firstArticle.getAttribute("data-sw-self") === "1";
    }
    const isSelf = this._isOwnMessage(firstArticle);
    firstArticle.setAttribute("data-sw-self", isSelf ? "1" : "0");
    return isSelf;
  }
  /**
   * Walk the React fiber attached to a message <article> to read its
   * `message.author.id`. Cached on the element via data-sw-author so
   * subsequent classify passes are O(1). Empty-string attribute value
   * is the "looked up, fiber yielded nothing" sentinel.
   *
   * Author identity is the SOURCE OF TRUTH for grouping. Discord's
   * `groupStart_` className is treated as a fallback only — they have
   * a habit of either renaming the suffix or applying it to every
   * article (observed 2026-05 with the new `groupStart__5126c`
   * double-underscore hash format that lands on every message, not
   * just true group-starts), which historically caused every message
   * to be classified as its own solo group.
   */
  _getAuthorId(article) {
    var _a, _b, _c, _d, _e, _f;
    if (!article) return null;
    if (article.hasAttribute("data-sw-author")) {
      const v = article.getAttribute("data-sw-author");
      return v === "" ? null : v;
    }
    let authorId = null;
    try {
      let fiber = BdApi.ReactUtils.getInternalInstance(article);
      for (let i = 0; i < 8 && fiber; i++) {
        const found = ((_c = (_b = (_a = fiber.memoizedProps) == null ? void 0 : _a.message) == null ? void 0 : _b.author) == null ? void 0 : _c.id) || ((_f = (_e = (_d = fiber.memoizedState) == null ? void 0 : _d.message) == null ? void 0 : _e.author) == null ? void 0 : _f.id);
        if (found) {
          authorId = found;
          break;
        }
        fiber = fiber.return;
      }
    } catch (_) {
    }
    if (authorId) article.setAttribute("data-sw-author", authorId);
    return authorId;
  }
  _getDesiredGroupPosition(groupSize, index) {
    if (groupSize === 1) return "sw-group-solo";
    if (index === 0) return "sw-group-start";
    if (index === groupSize - 1) return "sw-group-end";
    return "sw-group-middle";
  }
  _syncPositionClass(li, desiredPos) {
    if (li.classList.contains(desiredPos)) return;
    li.classList.add(desiredPos);
    for (const cls of SW_POS_CLASSES) {
      if (cls !== desiredPos) li.classList.remove(cls);
    }
  }
  _syncToggleClass(li, className, shouldHave) {
    if (shouldHave) li.classList.add(className);
    else li.classList.remove(className);
  }
  _applyGroupClasses(li, desiredPos, wantSelf, wantMentioned) {
    const hasPos = li.classList.contains(desiredPos);
    const hasSelf = li.classList.contains("sw-self");
    const hasMentioned = li.classList.contains("sw-mentioned");
    if (hasPos && hasSelf === wantSelf && hasMentioned === wantMentioned) return;
    this._syncPositionClass(li, desiredPos);
    this._syncToggleClass(li, "sw-self", wantSelf);
    this._syncToggleClass(li, "sw-mentioned", wantMentioned);
  }
  _classifyGroup(group) {
    if (!group.length) return;
    const isSelf = this._getGroupSelfFlag(group[0].article);
    const groupSize = group.length;
    for (let i = 0; i < groupSize; i++) {
      const { li, article } = group[i];
      const desiredPos = this._getDesiredGroupPosition(groupSize, i);
      const wantMentioned = article.className.includes("mentioned");
      this._applyGroupClasses(li, desiredPos, isSelf, wantMentioned);
    }
  }
  _classifyMessages() {
    const scroller = this._lastScrollerEl || document.querySelector(SCROLLER_SELECTOR);
    if (!scroller) return;
    let items = scroller.querySelectorAll(`:scope > ${MSG_LI_SELECTOR}`);
    if (!items.length) items = scroller.querySelectorAll(MSG_LI_SELECTOR);
    if (!items.length) return;
    const ver = String(this._classifyVersion || 1);
    let groupCount = 0;
    let currentGroup = [];
    let groupHasNew = false;
    let prevAuthorId = null;
    const flushGroup = () => {
      if (!currentGroup.length) return;
      if (groupHasNew) {
        this._classifyGroup(currentGroup);
        for (const { li } of currentGroup) {
          li.dataset.swVer = ver;
        }
      }
      groupCount++;
      currentGroup = [];
      groupHasNew = false;
    };
    for (const li of items) {
      let article = this._articleCache.get(li);
      if (!article || !li.contains(article)) {
        article = li.querySelector(':scope > div[role="article"]') || li.querySelector('div[role="article"]');
        if (article) this._articleCache.set(li, article);
      }
      if (!article) {
        flushGroup();
        prevAuthorId = null;
        continue;
      }
      const authorId = this._getAuthorId(article);
      let isBoundary;
      if (prevAuthorId !== null && authorId !== null) {
        isBoundary = authorId !== prevAuthorId;
      } else {
        isBoundary = article.className.includes("groupStart");
      }
      if (isBoundary) flushGroup();
      if (li.dataset.swVer !== ver) groupHasNew = true;
      currentGroup.push({ li, article });
      if (authorId !== null) prevAuthorId = authorId;
    }
    flushGroup();
    if (this.settings.debugMode) {
      console.log(`[SystemWindow] Classified ${items.length} messages into ${groupCount} groups (v${ver})`);
    }
  }
  _isOwnMessage(article) {
    if (!this._currentUserId || !article) return false;
    return this._getAuthorId(article) === this._currentUserId;
  }
  _cleanupClasses() {
    document.querySelectorAll(".sw-group-solo, .sw-group-start, .sw-group-middle, .sw-group-end, .sw-self, .sw-mentioned").forEach(
      (el) => el.classList.remove("sw-group-solo", "sw-group-start", "sw-group-middle", "sw-group-end", "sw-self", "sw-mentioned")
    );
    document.querySelectorAll('div[role="article"][data-sw-self], div[role="article"][data-sw-author]').forEach((el) => {
      el.removeAttribute("data-sw-self");
      el.removeAttribute("data-sw-author");
    });
    document.querySelectorAll("li[data-sw-ver]").forEach((el) => delete el.dataset.swVer);
  }
  /* ═══════════════════════════════════════════════
     §4  CSS Injection
     ═══════════════════════════════════════════════ */
  _injectCSS() {
    BdApi.DOM.removeStyle(this._STYLE_ID);
    BdApi.DOM.addStyle(this._STYLE_ID, buildCSS());
  }
  /* ═══════════════════════════════════════════════
     §5  Settings
     ═══════════════════════════════════════════════ */
  _saveSettings(next) {
    const merged = { ...this.settings, ...next };
    saveSettings("SystemWindow", merged);
    this.settings = merged;
  }
  getSettingsPanel() {
    var _a, _b;
    const panel = document.createElement("div");
    panel.style.cssText = "padding: 16px; background: rgba(10, 10, 16, 0.98); border-radius: 2px;";
    panel.innerHTML = `
      <div>
        <h2 style="margin: 0 0 4px 0; color: #dcddde; font-size: 18px;">SystemWindow</h2>
        <p style="margin: 0 0 16px 0; opacity: 0.6; font-size: 12px; color: #dcddde;">
          Codeblock-style message display with SL theming
        </p>
      </div>

      <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px;">
        <label style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px; cursor: pointer;">
          <input id="sw-enabled" type="checkbox" ${this.settings.enabled ? "checked" : ""} />
          <span style="color: #dcddde;">Enabled</span>
        </label>

        <label style="display: flex; gap: 10px; align-items: center; cursor: pointer;">
          <input id="sw-debug" type="checkbox" ${this.settings.debugMode ? "checked" : ""} />
          <span style="color: #dcddde;">Debug Mode</span>
        </label>
      </div>
    `;
    (_a = panel.querySelector("#sw-enabled")) == null ? void 0 : _a.addEventListener("change", (e) => {
      this._saveSettings({ enabled: e.target.checked });
      if (e.target.checked) {
        this._injectCSS();
        this._attachObserver();
      } else {
        BdApi.DOM.removeStyle(this._STYLE_ID);
        this._detachObserver();
        this._cleanupClasses();
      }
    });
    (_b = panel.querySelector("#sw-debug")) == null ? void 0 : _b.addEventListener("change", (e) => {
      this._saveSettings({ debugMode: e.target.checked });
    });
    return panel;
  }
};
