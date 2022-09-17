// ==UserScript==
// @name         Cosmic Cat
// @namespace    https://www.youtube.com/*
// @version      0.5.44b3
// @description  Broadcast Yourself
// @author       CiulinUwU
// @updateURL    https://raw.githubusercontent.com/ciulinuwu/cosmic-cat/main/cosmic-cat.user.js
// @downloadURL  https://raw.githubusercontent.com/ciulinuwu/cosmic-cat/main/cosmic-cat.user.js
// @match        https://www.youtube.com/
// @match        https://www.youtube.com/?*
// @match        https://www.youtube.com/watch?*
// @match        https://www.youtube.com/user/*
// @match        https://www.youtube.com/channel/*
// @match        https://www.youtube.com/c/*
// @match        https://www.youtube.com/results*
// @match        https://www.youtube.com/shorts/*
// @match        https://www.youtube.com/feed/explore
// @match        https://www.youtube.com/embed/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @require      https://github.com/ciulinuwu/cosmic-cat/raw/main/modules/yabai_component.js
// @require      https://github.com/ciulinuwu/cosmic-cat/raw/main/modules/open_uix_components.js
// @require      https://raw.githubusercontent.com/ciulinuwu/ciulinuwu.github.io/main/lib/v3player_loader.js
// @require      https://code.jquery.com/jquery-3.6.1.min.js
// @grant unsafeWindow
// @grant GM_addStyle
// @grant GM.getValue
// @grant GM.setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_deleteValue
// @grant GM_listValues
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_log
// @grant GM_openInTab
// @grant GM_setClipboard
// @grant GM_info
// @run-at document-start
// ==/UserScript==
/* jshint esversion: 11 */

(async () => {
    'use strict';
    function debug(a) {
        return console.debug(`[Cosmic Cat]`, a);
    }
    function error(a) {
        return console.error(`[Cosmic Cat]`, a);
    }

    var BOOL_LOGIN;
    var BOOL_SUBSCRIBE;
    var commCount = 1;
    document.cosmicCat = {
        data: {
            version: 4,
            loggedin: false,
            darkyoutubelogo: "data:image/png;base64,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",
            i18nfolder: "https://raw.githubusercontent.com/ciulinuwu/ciulinations/main/i18n/",
            darkNoiseBg: "data:image/png;base64,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",
            playerSettingsSheet: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAANCAIAAADntZOlAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAlSURBVBhXY/j//z/Tv39/gfgfnP7/H8GGif8H0r9//WT69uUTAPDNJqPDjzoaAAAAAElFTkSuQmCC",
            playbarScrub: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD5SURBVChTjZHNjkRQEIUP4p+dVe/EC9iJhQgvLlYsvQC2JFaIIOH21G09s5CZnpNclZz66kdKwKVt21hd1xiG4XJechwHnudBVVXO8s88zyzPcxzHAUH47sHFGIMkSYjjGJZlCQJ1LooC+75D0zSs63qLJEVREIYhxKZpeGcyoiiCLMu3+LUOzvMEsWLXdTAMg5u/iXLE9H0PkXYk468Cmk6Ppoj0Q58K3nli+Ur/LSBW1HWdj/pUQAyxYpqmqKqKm+M44vF43CLliCGWX6ltW0ZGEAQwTZN3fWtZFpRlCd/34bruz1np2lmWYZqmy3nJtm0kScKvDABP3bl3Ot4gE8wAAAAASUVORK5CYII=",
            playbarSheet: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAZCAIAAAB/8tMoAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAhSURBVBhXY7h69SoTCDAzMxNNMzAwgNmMjIyEMMP///8BIN0GJrVyhfoAAAAASUVORK5CYII=",
            playerSheetB: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADLCAYAAACYqDZvAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABaOSURBVHhe7Z0J1FVT+8D3vYq8bxpJ6C3RKM2Tpq9oklqEUn2t8CeLaDCUhcoyfFmL9PmoKGItlimfEhJJ6JMopAlFkwyZEmVKOP/9ezr7du7tvufec4fX7d79W+tZ7xn23ue9+zl7fPZ+jurXr58zbtw4p2fPno7KEJdcconz+OOPO0OGDMlYmoVCaOLEic7evXtV5cqV1ZdffqkWLVqk1q9fH3Lvp8SSJUucww47TCHvvPOOmjp1qlq7dm1aaRYK4V27dqlffvlFbd++XVWsWFFdeOGFqnv37mm92Ycccoj6448/1M8//6yaNWumZsyYoQYPHmxLSxKE//rrL+U4jshPP/0kitEKUVdccYVTv379lDKRNI38/vvv6s8//1Rjx45FMU6TJk2sYnwIG2UYIfOoukxp6datW+AMjE0TobQ0bdpUzZw5U5133nlWKaUQdv8eABn49ddfK93YS2k58cQTk87EeApBaKtQuO5EqHvvvddp3LixVUwMB5QQr5jSUlxcrC666CLVtWtXp1atWgkz0VtlxQpp7t69W0rLfffdpwYMGOCUlJRYxbj4KsSIaVt69OihDj/8cDdq6cRLI1ZoW1AQbUu1atXcmJakFILwZm/ZskV6ZImIFz+eoBAUTU/Pso+kFfL555+rp59+WtqBRMSLH0/ef/99NWLEiKSUXCiU2qgb9uzZo95880310ksvqUMPPVSFQonHd942I578+OOPavr06Wr8+PFS8pJJs1AIXXrppaU2qF988QWjbslE3etKOte08kpNc/Xq1equu+6SdkmL1UQMcaus3377TUrFwoULVfny5QMpA+KlSTvBiH3ChAlS7VllxOcAhVAq5s6dKw24zrjQ999/HzjjYquoVatWqVGjRsk8GWnu2LHDKqMUZC4LRVAqli1bJqUiHA4HLhVe6DmRJuMNRuYTJ06UtiidNAuG6tWrO61atXKOOOIIR48xMjJAO+GEE2Tq/eijj3aKiorsoC8IFStWZKpcFOJeShvSqlChglOpUiWrDIvFYrFYLBZLDhAaP368U7NmTTn56quv1KRJkyKDN7978Zg3bx6WRTne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",
            scrubBarGraySheet: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAICAYAAAA4GpVBAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAaSURBVBhXYzAyMvrP9OHDBwYmBiDAQTAwAACYMAR0XgeDoQAAAABJRU5ErkJggg==",
            scrubBarRedSheet: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAICAYAAAA4GpVBAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZSURBVBhXYzjDwPCf6TMDAwM68QWJy8AAAMJ9CIClUo4sAAAAAElFTkSuQmCC",
            playbarShadow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAZCAIAAACZ2xhsAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA6SURBVChTY1y2bJm4uLiAgAA3NzcTAxgwggGIA2UBwWCRgQAMZXCA0AMECBkEB8gCkthkIIB0AxgZAbxaA1A95vt3AAAAAElFTkSuQmCC",
            playbarSeeker: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABQSURBVBhXbYqxDYAwEANP7kkmyDBZiDYTsUK2oosUpTK8oEK4OFu22UsxB1gJ0HaDs3eHQ2vNqrWinDNKKU6htZZlmy9ifNIYA8053+4fcAGeySL/5lJgnAAAAABJRU5ErkJggg==",
            playbarSeek: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAECAIAAADAusJtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZSURBVBhXYzhy5AiToKAgw5s3bxi+f/8OADiwCCtHhAKiAAAAAElFTkSuQmCC",
            playbarBg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAIAAAD5ZqGGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAtSURBVBhXY/B0d2dmYWVlYmBgYPr37x/T////wTSID2ODaHSMTy2yHjD7/38AbSI/wk3ikisAAAAASUVORK5CYII=",
            loginUrl: "https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en&ec=65620",
            lang: {
                "af": "Afrikaans",
                "ar": "",
                "az": "Azərbaycan",
                "bs": "Bosanski",
                "ca": "Català",
                "cs": "Čeština",
                "da": "Dansk",
                "de": "Čeština",
                "en": "English",
                "en-GB": "English (UK)",
                "en-IN": "English (India)",
                "es": "Español (España)",
                "es-419": "Español (España)",
                "es-US": "Español (US)",
                "et": "Eesti",
                "eu": "Euskara",
                "fa": "",
                "fi": "Suomi",
                "fil": "Filipino",
                "fr": "Français",
                "fr-CA": "Français (Canada)",
                "gl": "Galego",
                "hr": "Hrvatski",
                "hu": "Magyar",
                "pl": "Polski"
            }
        },
        load: {
            recent_feed: async () => {
                var test = new Promise(async resolve => {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", `https://www.youtube.com${window.location.pathname}/community`);
                    xhr.onload = async () => {
                        let a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs.find(b => b.tabRenderer ? b.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'community' : {});
                        if(!a.tabRenderer) return resolve({});
                        let sortImages = async (img) => {
                            let stor = "";
                            for (let i = 0; i < img.images.length; i++) {
                                stor += `<img src="${img.images[i].backstageImageRenderer.image.thumbnails[0].url}"/>`;
                            }
                            return stor;
                        };
                        let video = async (vid) => {
                            let {id, title, time} = document.cosmicCat.func.organizeVideoData(vid);
                            return `<div class="playnav-item playnav-video">
<div style="display:none" class="encryptedVideoId">${id}</div>
<div class="selector"></div>
<div class="content">
<div class="playnav-video-thumb">
<a href="https://www.youtube.com/watch?v=${id}" onclick="document.cosmicCat.func.loadPlaynavVideo('${id}');return false;" class="ux-thumb-wrap">
<span class="video-thumb ux-thumb-96 ">
<span class="clip">
<img src="//i1.ytimg.com/vi/${id}/default.jpg" alt="Thumbnail" class="" onclick="document.cosmicCat.func.loadPlaynavVideo('${id}');return false;" title="${title}">
</span>
</span>
<span class="video-time">${time}</span>
</a>
</div>
<div class="playnav-video-info">
<a href="https://www.youtube.com/watch?v=${id}" class="playnav-item-title ellipsis" onclick="document.cosmicCat.func.loadPlaynavVideo('${id}');return false;">
<span dir="ltr">${title}</span>
</a>
<div style="display:none" id="playnav-video-play-uploads-12">${id}</div>
</div>
</div>
</div>`;
                        };
                        let filter = async (j) => {
                            let img = j.backstageAttachment;
                            if(!img) return '';
                            let stor = "";
                            for (const obj in img) {
                                switch (obj) {
                                    case 'postMultiImageRenderer':
                                        stor = await sortImages(img.postMultiImageRenderer);
                                        break;
                                    case 'backstageImageRenderer':
                                        stor = '<img src="' + img.backstageImageRenderer.image.thumbnails[0].url + '">';
                                        break;
                                    case 'videoRenderer':
                                        stor = await video(img.videoRenderer);
                                        break;
                                }
                            }
                            return stor;
                        };
                        let b = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents;
                        let j;
                        let data = [];
                        for (j = 0; j < b.length; j++) {
                            if(b[j].backstagePostThreadRenderer) {
                                data[j] = {};
                                let post = b[j].backstagePostThreadRenderer.post.sharedPostRenderer ? b[j].backstagePostThreadRenderer.post.sharedPostRenderer.originalPost.backstagePostRenderer : b[j].backstagePostThreadRenderer.post.backstagePostRenderer;
                                data[j].text = post.contentText.runs ? post.contentText.runs[0].text : "";
                                data[j].images = await filter(post);
                                data[j].author = post.authorText.runs[0].text;
                                data[j].timestamp = post.publishedTimeText.runs[0].text;
                            }
                        }
                        resolve(data);
                    };
                    xhr.onerror = () => {
                        console.error("** An error occurred during the XMLHttpRequest");
                    };
                    xhr.send();
                });

                let a = await test;

                return a;
            },
            channel_subscriptions: async () => {
                var test = new Promise(async resolve => {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", `https://www.youtube.com${window.location.pathname}/channels?view=56&shelf_id=0`);
                    xhr.onload = async () => {
                        let a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs.find(b => b.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'channels');
                        let master = {array: [], length: 0};
                        if(!a.tabRenderer || !a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer) return resolve(master);
                        let list = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items;

                        let fetch = async (url) => {
                            let a = await document.cosmicCat.AJAX.post("/youtubei/v1/browse", `continuation: "${url}"`);
                            await loop(a.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems);
                            return a;
                        };

                        let loop = async (obj) => {
                            for (let i = 0; i < obj.length; i++) {
                                if(obj[i].continuationItemRenderer) {
                                    let te = obj[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token;
                                    await fetch(te);
                                }
                                if(obj[i].gridChannelRenderer) {
                                    master.array.push(obj[i].gridChannelRenderer);
                                    master.length += 1;
                                }
                            }
                        };

                        await loop(list);
                        resolve(master);
                    };
                    xhr.onerror = () => {
                        console.error("** An error occurred during the XMLHttpRequest");
                    };
                    xhr.send();
                });

                let a = await test;

                return a;
            },
            home_category: async (category) => {
                if(!category || window.location.pathname !== "/") {
                    window.location.href = "/?c=subscriptions";
                    return;
                }
                var guide = document.querySelector(".guide");
                if(guide.getAttribute("data-last-clicked-item") == category.getAttribute("data-feed-name")) return;
                guide.setAttribute("data-last-clicked-item", category.getAttribute("data-feed-name"));
                document.querySelector(".selected-child").classList.remove("selected-child");
                document.querySelector(".selected").classList.remove("selected");
                category.parentNode.classList.add("selected-child");
                category.classList.add("selected");
                document.querySelector("#feed-loading-template").classList.remove("hid");
                document.querySelector("#feed-main-youtube").classList.add("hid");
                document.querySelector("#feed-error").classList.add("hid");
                var url = category.getAttribute("data-feed-url");
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com${url}`);
                xhr.timeout = 4000;
                xhr.ontimeout = () => {
                    console.error("** An error occurred during the XMLHttpRequest");
                    document.querySelector("#feed-loading-template").classList.add("hid");
                    document.querySelector("#feed-error").classList.remove("hid");
                };
                xhr.onload = async () => {
                    document.querySelector(".feed-header-info").innerText = category.querySelector(".display-name").innerText;
                    let json = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]);
                    let template = (a) => {
                        let videoData = document.cosmicCat.func.organizeVideoData(a);
                        let string_uploadedorlive;
                        if(videoData.views[1].length > 1) {
                            string_uploadedorlive = localizeString("watch.uploadedavideo", videoData);
                        } else {
                            string_uploadedorlive = localizeString("watch.islive", videoData);
                        }
                        let o = `<li>
<div class="feed-item-container first" data-channel-key="UCBE-FO9JUOghSysV9gjTeHw">
<div class="feed-author-bubble-container">
<a href="${videoData.url}" class="feed-author-bubble">
<span class="feed-item-author">
<span class="video-thumb ux-thumb yt-thumb-square-28">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${videoData.icon}" alt="${videoData.owner.text}" data-thumb="${videoData.icon}" width="28"><span class="vertical-align"></span>
</span>
</span>
</span>
</span>
</a>
</div>
<div class="feed-item-main">
<div class="feed-item-header">
<span class="feed-item-actions-line">
${string_uploadedorlive} <span class="feed-item-time">${videoData.views[1]}</span>
</span>
</div>
<div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Steam for Linux a Bad Idea? - This Week in Linux Gaming" data-context-item-type="video" data-context-item-time="5:21" data-context-item-user="nixiedoeslinux" data-context-item-id="7LVtbTurdCk" data-context-item-views="25,816 views" data-context-item-actionuser="nixiedoeslinux">
<div class="feed-item-thumb">
<a class="ux-thumb-wrap contains-addto yt-uix-contextlink yt-uix-sessionlink" href="/watch?v=${videoData.id}">
<span class="video-thumb ux-thumb yt-thumb-default-185">
<span class="yt-thumb-clip"><span class="yt-thumb-clip-inner">
<img src="//i2.ytimg.com/vi/${videoData.id}/hqdefault.jpg" alt="Thumbnail" width="185"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${videoData.time}</span>
<button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="7LVtbTurdCk" role="button">
<span class="yt-uix-button-content">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
</span>
</button>
</a>
</div>
<div class="feed-item-content">
<h4>
<a class="feed-video-title title yt-uix-contextlink yt-uix-sessionlink" href="/watch?v=${videoData.id}">${videoData.title}</a>
</h4>
<div class="metadata">
<span class="view-count">${videoData.views[0]}</span>
<div class="description">
<p>${videoData.description}</p>
</div>
</div>
</div>
</div>
</div>
<span class="feed-item-action-menu subscribed" data-external-id="PqyfOmT8QmomqIwGPT4hxRGvXqh6izrXz8s1TlSF8fg0h_MQ8Qjx10A==">
<button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-69285446284"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;">Hide this activity</span></li><li role="menuitem" id="aria-id-71783894232"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;">Only show uploads from nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-62584392243"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;">Subscribe to nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-68105254288"><span data-channel-key="UCBE-FO9JUOghSysV9gjTeHw" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item">Unsubscribe from nixiedoeslinux
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div></div>

      </li>`;

                        return o;
                    };
                    let fetch = await document.cosmicCat.func.handleCategory(json, "0", "22", template, [[], []]);
                    document.querySelector(".feed-header-thumb .feed-header-icon").classList.remove(document.querySelector(".feed-header-thumb .feed-header-icon").classList[1]);
                    document.querySelector(".feed-header-thumb .feed-header-icon").classList.add(document.querySelector(".selected .system-icon").classList[2]);
                    document.querySelector(".context-data-container").innerHTML = fetch;
                    document.querySelector("#feed-loading-template").classList.add("hid");
                    document.querySelector("#feed-main-youtube").classList.remove("hid");
                };
                xhr.send();
            },
            browse_category: async (category = String) => {
                let obj = {class: category, html: ""};
                let string = "";
                let template = async(current) => {
                    let {owner, time, views, title, id, url} = document.cosmicCat.func.organizeVideoData(current);
                    let a = `<div class="browse-item yt-tile-default">
<a href="https://www.youtube.com/watch?v=${id}" class="ux-thumb-wrap yt-uix-sessionlink yt-uix-contextlink contains-addto">
<span class="video-thumb ux-thumb yt-thumb-default-194">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner"><img alt="Thumbnail" src="//i2.ytimg.com/vi/${id}/hqdefault.jpg" data-group-key="thumb-group-0" width="179"><span class="vertical-align"></span></span>
</span>
</span>
<span class="video-time">${time}</span>
</a>
<div class="browse-item-content">
<h3 dir="ltr">
<a class="yt-uix-sessionlink" href="https://www.youtube.com/watch?v=${id}" title="${title}">${title}</a>
</h3>
<div class="browse-item-info">
<div class="metadata-line">
<span class="viewcount">${views[0]}</span>
<span class="metadata-separator">|</span>
<span class="video-date-added">${views[1]}</span>
</div>
<a class="yt-uix-sessionlink yt-user-name" dir="ltr" href="https://www.youtube.com${url}">${owner.text}</a>
</div>
</div>
</div>`;
                    return a;
                };
                switch (category) {
                    case "most-viewed":
                        obj.name = localizeString("browse.mostviewed");
                        obj.html = await document.cosmicCat.func.handleCategory(ytInitialData, 4, 8, template, ['<div class="browse-item-row ytg-box">', '</div>']);
                        return obj;
                    case "recommended":
                        string = "/";
                        obj.name = localizeString("browse.recommended");
                        break;
                    case "music":
                        obj.name = localizeString("guide.music");
                        string = "/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ";
                        break;
                    case "film":
                        obj.name = "Film";
                        string = "/feed/storefront";
                        break;
                    case "live":
                        obj.name = localizeString("guide.live");
                        string = "/channel/UC4R8DWoMoI7CAwX8_LjQHig";
                        break;
                    case "gaming":
                        obj.name = localizeString("guide.gaming");
                        string = "/gaming";
                        break;
                    case "news":
                        obj.name = localizeString("guide.news");
                        string = "/channel/UCYfdidRxbB8Qhf0Nx7ioOYw";
                        break;
                    case "sports":
                        obj.name = localizeString("guide.sports");
                        string = "/channel/UCEgdi0XIXXZ-qJOFPf4JSKw";
                        break;
                    case "edu":
                        obj.name = localizeString("guide.education");
                        string = "/channel/UCtFRv9O2AHqOZjjynzrv-xg";
                        break;
                    case "howto":
                        obj.name = localizeString("guide.howto");
                        string = "/channel/UCrpQ4p1Ql_hG8rKXIKM1MOQ";
                        break;
                }
                var test = new Promise(async resolve => {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", `https://www.youtube.com${string}`);
                    xhr.onload = async () => {
                        let json = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]);
                        let CONTENTS = await document.cosmicCat.func.handleCategory(json, 4, 8, template, ['<div class="browse-item-row ytg-box">', '</div>']);
                        resolve(CONTENTS);
                    };
                    xhr.onerror = () => {
                        console.error("** An error occurred during the XMLHttpRequest");
                    };
                    xhr.send();
                });
                obj.html = await test;
                return obj;
            },
            homepage_list: (category = String) => {
                let obj = {class: category};
                let string = "";
                switch (category) {
                    case "trending":
                        obj.name = localizeString("guide.trending");
                        string = "/feed/trending";
                        break;
                    case "popular":
                        obj.name = localizeString("guide.popular");
                        string = "/channel/UCF0pVplsI8R5kcAqgtoRqoA";
                        break;
                    case "music":
                        obj.name = localizeString("guide.music");
                        string = "/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ";
                        break;
                    case "live":
                        obj.name = localizeString("guide.live");
                        string = "/channel/UC4R8DWoMoI7CAwX8_LjQHig";
                        break;
                    case "gadgets":
                        obj.name = localizeString("guide.gaming");
                        string = "/gaming";
                        break;
                    case "news":
                        obj.name = localizeString("guide.news");
                        string = "/channel/UCYfdidRxbB8Qhf0Nx7ioOYw";
                        break;
                    case "sports":
                        obj.name = localizeString("guide.sports");
                        string = "/channel/UCEgdi0XIXXZ-qJOFPf4JSKw";
                        break;
                    case "education":
                        obj.name = localizeString("guide.education");
                        string = "/channel/UCtFRv9O2AHqOZjjynzrv-xg";
                        break;
                    case "howto":
                        obj.name = localizeString("guide.howto");
                        string = "/channel/UCrpQ4p1Ql_hG8rKXIKM1MOQ";
                        break;
                    case "technoblade":
                        obj.name = "Technoblade";
                        string = "/c/technoblade";
                        break;
                }
                obj.url = string;
                return obj;
            },
            subscriptions: async () => {
                let test = new Promise(async resolve => {
                    let subs = await document.cosmicCat.AJAX.post("/youtubei/v1/guide");
                    let org = await document.cosmicCat.func.organizeSubscriptionsData(subs);
                    resolve(org);
                });

                let a = await test;
                return a;
            },
            picker: async (pickie = String) => {
                document.querySelector("#picker-loading").removeAttribute("style");
                let api = await document.cosmicCat.func.getApi("/youtubei/v1/account/account_menu");
                let sum = api.actions[0].openPopupAction.popup.multiPageMenuRenderer.sections[2].multiPageMenuSectionRenderer.items;
                let ij, ik, ia, io, iu, pp;
                let fixArr = [];
                for (let i = 0; i < sum.length; i++) {
                    if(sum[i].compactLinkRenderer) {
                        fixArr.push(sum[i].compactLinkRenderer);
                    }
                }

                switch (pickie) {
                    case "LANGUAGE":
                        sum = fixArr.find(a => a.icon.iconType == "TRANSLATE");
                        ij = "selectLanguageCommand";
                        ik = "hl";
                        pp = "lang";
                        ia = "language-picker";
                        io = "Choose your language";
                        iu = "Choose the language in which you want to view YouTube. This will only change the interface, not any text entered by other users.";
                        break;
                    case "COUNTRY":
                        sum = fixArr.find(a => a.icon.iconType == "LANGUAGE");
                        ij = "selectCountryCommand";
                        ik = "gl";
                        pp = "country";
                        ia = "region-picker";
                        io = "Choose your content location";
                        iu = "Choose which country or region's content (videos and channels) you would like to view. This will not change the language of the site.";
                        break;
                }

                let test = sum.serviceEndpoint.signalServiceEndpoint.actions[0].getMultiPageMenuAction.menu.multiPageMenuRenderer.sections[0].multiPageMenuSectionRenderer.items;
                let result = "";

                let outArray = [ [], [], [], [], [], [], [], [], [] ];
                let bh = (ik == "gl") ? ['<div class="flag-list">', "</div>"] : ["", ""];
                let bi = (ik == "gl") ? `<div class="flag-list first"><div class="flag-div"><img id="flag_en_US" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="flag_en_US" alt="" width="17" height="11"> <span class="selected">Worldwide (All)</span></div></div>` : ``;
                for (let i = 0; i < test.length; i++) {
                    outArray[Math.floor(i/12)].push({name: test[i].compactLinkRenderer.title.simpleText, lang: test[i].compactLinkRenderer.serviceEndpoint.signalServiceEndpoint.actions[0][ij][ik]});
                }
                for (let i = 0; i < outArray.length; i++) {
                    let aaa = ``;
                    for (let I = 0; I < outArray[i].length; I++) {
                        let im = (ik == "gl") ? `<a href="#" onclick="document.cosmicCat.picker.set('${pp}', '${outArray[i][I].lang}'); return false;"><img id="flag_${outArray[i][I].lang.toLowerCase()}_${outArray[i][I].lang}" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="flag_${outArray[i][I].lang.toLowerCase()}_${outArray[i][I].lang}" alt="" width="17" height="11"> </a>` : ``;
                        aaa += `<div class="flag-div">${im}
<a href="#" onclick="document.cosmicCat.picker.set('${pp}', '${outArray[i][I].lang}'); return false;">${outArray[i][I].name}</a>
</div>`;
                    }
                    result += `<div class="flag-bucket">${aaa}</div>`;
                }
                let html = `<div id="${ia}" style="" class="yt-tile-static">
<div class="picker-top">
<div class="box-close-link">
<img onclick="_hidediv('${ia}');" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Close">
</div>
<h2>${io}</h2>
<p>${iu}</p>
<div class="clearR"></div>
</div>
<div>${bi}${bh[0]}${result}${bh[1]}<div class="spacer">&nbsp;</div></div>
</div>`;

                document.querySelector("#picker-container").innerHTML = html;
                document.querySelector("#picker-loading").classList.add("hid");
            },
            moreSuggestedVideos: async (token = String) => {
                let stopLoad = () => {
                    document.querySelector("#watch-more-related-button").classList.remove("hid");
                    document.querySelector("#watch-more-related").classList.add("hid");
                };
                let hide = () => {
                    document.querySelector("#watch-more-related-button").classList.add("hid");
                    document.querySelector("#watch-more-related").classList.add("hid");
                };
                if(!token) return stopLoad();
                document.querySelector("#watch-more-related").classList.remove("hid");
                document.querySelector("#watch-more-related-button").classList.add("hid");
                let api = await document.cosmicCat.func.getApi("/youtubei/v1/next", `continuation: "${token}"`);
                let collection = api.onResponseReceivedEndpoints[0] ? api.onResponseReceivedEndpoints[0].appendContinuationItemsAction.continuationItems : [];
                if(collection.length == 0 || collection == false) return stopLoad();
                var VALUE_SUGGVIDLOG = (BOOL_LOGIN == true) ? "addto-watch-later-button": "addto-watch-later-button-sign-in";
                let result = "";
                for (let i = 0; i < collection.length; i++) {
                    if (collection[i].compactVideoRenderer) {
                        let videoData = document.cosmicCat.func.organizeVideoData(collection[i].compactVideoRenderer);
                        result += `<li class="video-list-item">
<a href="https://www.youtube.com/watch?v=${videoData.id}" class="related-video yt-uix-contextlink yt-uix-sessionlink">
<span class="ux-thumb-wrap contains-addto">
<span class="video-thumb ux-thumb yt-thumb-default-120">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="//i1.ytimg.com/vi/${videoData.id}/default.jpg" alt="Thumbnail"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${videoData.time}</span>
<button type="button" class="addto-button video-actions spf-nolink ${VALUE_SUGGVIDLOG} yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" onclick=";return false;" role="button">
<span class="yt-uix-button-content">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="${localizeString("personal.watchlater")}">
</span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</button>
</span>
<span dir="ltr" class="title" title="${videoData.title}">${videoData.title}</span>
<span class="stat attribution">${localizeString("watch.by", videoData)}</span>
<span class="stat view-count">${videoData.views[0]}</span>
</a>
</li>`;
                    }
                    if (collection[i].continuationItemRenderer) {
                        document.querySelector("#watch-more-related-button").setAttribute("data-token", collection[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token);
                    }
                }
                document.querySelector("#watch-related").innerHTML += result;
                if (!collection.at(-1).continuationItemRenderer) return hide();
                stopLoad();
            },
        },
        func: {
            trackCurrent: () => {
                document.querySelector("#timestamp_current").innerText = document.cosmicCat.func.calculateLength(parseInt(document.cosmicCat.player.getCurrentTime()));
            },
            handleCategory: async (yt = Object, divide = Number, maxAmount = Number, func = Function, ex = Array) => {
                if(!yt || !divide || !maxAmount || !func || !ex) return;
                var CONTENTS = "";
                let TAB = [];
                let p = yt.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content;
                let b = p.sectionListRenderer ? p.sectionListRenderer.contents : p.richGridRenderer.contents;
                for (let i = 0; i < b.length; i++) {
                    let b_a = b[i].itemSectionRenderer ? b[i].itemSectionRenderer.contents[0] : b[i].richItemRenderer;
                    b_a = b_a ? b_a : {};
                    if(b_a.shelfRenderer && b_a.shelfRenderer.content.gridRenderer) {
                        let b_b = b_a.shelfRenderer.content.gridRenderer.items;
                        for (let i_ = 0; i_ < b_b.length; i_++) {
                            TAB.push(b_b[i_].gridVideoRenderer);
                        }
                    }
                    if(b_a.shelfRenderer && b_a.shelfRenderer.content.expandedShelfContentsRenderer) {
                        let b_b = b_a.shelfRenderer.content.expandedShelfContentsRenderer.items;
                        for (let i_ = 0; i_ < b_b.length; i_++) {
                            TAB.push(b_b[i_].videoRenderer);
                        }
                    }
                    if(b_a.content && b_a.content.videoRenderer) {
                        TAB.push(b_a.content.videoRenderer);
                    }
                    if(b_a.shelfRenderer && b_a.shelfRenderer.content.horizontalListRenderer && b_a.shelfRenderer.content.horizontalListRenderer.items) {
                        let b_c = b_a.shelfRenderer.content.horizontalListRenderer.items;
                        for (let e = 0; e < b_c.length; e++) {
                            if(b_c[e].gridVideoRenderer){
                                let b_b = b_c[e].gridVideoRenderer;
                                if((b_b.thumbnailOverlays ? b_b.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer).thumbnailOverlayTimeStatusRenderer.text.simpleText : undefined) !== "SHORTS") {
                                    TAB.push(b_b);
                                }
                            }
                        }
                    }
                    if(b_a.horizontalCardListRenderer && b_a.horizontalCardListRenderer.cards) {
                        let b_c = b_a.horizontalCardListRenderer.cards;
                        for (let e = 0; e < b_c.length; e++) {
                            if(b_c[e].videoCardRenderer){
                                let b_b = b_c[e].videoCardRenderer;
                                TAB.push(b_b);
                            }
                        }
                    }
                }
                var anal = TAB;
                var work = [];
                if(TAB[0] && TAB[0][0]) {
                    anal = [].concat(TAB[0], TAB[1]);
                }
                for (let i = 0; i < anal.length; i++) {
                    if(i < maxAmount) {
                        work.push(anal[i]);
                    }
                }
                if(divide == 4) {
                    let outArray = [ [], [] ];
                    for (let i = 0; i < work.length; i++) {
                        outArray[Math.floor(i/4)].push(work[i]);
                    }
                    work = outArray;
                }
                for (let i = 0; i < work.length; i++) {
                    let bitch = "";
                    if(divide == 4) {
                        for (let I = 0; I < work[i].length; I++) {
                            bitch += await func(work[i][I]);
                        }
                    } else {
                        bitch += await func(work[i]);
                    }
                    CONTENTS += `${ex[0]}${bitch}${ex[1]}`;
                }
                return CONTENTS;
            },
            organizeVideoData: (da = Object) => {
                let regEx = /(Premiere[ |s|d])|(in progress.)|Started|less than/g;
                let owner = (da.owner) ? da.owner.videoOwnerRenderer.title.runs[0] : da.bylineText ? da.bylineText.runs[0] : da.shortBylineText ? da.shortBylineText.runs[0] : da.ownerText ? da.ownerText.runs[0] : da.videoDetails ? da.videoDetails.author : "";
                let time = da.thumbnailOverlays ? da.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer) ? da.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer).thumbnailOverlayTimeStatusRenderer.text.simpleText ? da.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer).thumbnailOverlayTimeStatusRenderer.text.simpleText : da.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer).thumbnailOverlayTimeStatusRenderer.text.runs[0].text : da.lengthText ? da.lengthText.simpleText : "" : "";
                let upload = (da.dateText) ? da.dateText.simpleText.replace(regEx, "") : (da.publishedTimeText) ? (da.publishedTimeText.simpleText) ? da.publishedTimeText.simpleText.replace(regEx, "") : da.publishedTimeText.runs[0].text.replace(regEx, "") : da.microformat ? da.microformat.playerMicroformatRenderer.publishDate : "";
                let vi = da.viewCount ? da.viewCount.videoViewCountRenderer.viewCount : da.viewCountText ? da.viewCountText : "";
                let view = (vi.simpleText) ? vi.simpleText : (vi.runs) ? (vi.runs[1]) ? vi.runs[0].text + vi.runs[1].text : vi.runs[0].text : da.videoDetails ? da.videoDetails.viewCount : false;
                let meta = da.metadataText ? da.metadataText.simpleText.split(" · ") : [[],[]];
                view = view.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                let views = view ? [view, upload] : meta;
                if (views[0] == "false") {
                    views[0] = "";
                }
                let title = da.title ? (da.title.simpleText) ? da.title.simpleText : (da.title.runs) ? da.title.runs[0].text : false : da.videoDetails ? da.videoDetails.title : "";
                let videoId = da.videoId ? da.videoId : da.videoDetails ? da.videoDetails.videoId : "";
                let url = owner.navigationEndpoint ? owner.navigationEndpoint.browseEndpoint.canonicalBaseUrl : da.videoDetails ? "/channel/" + da.videoDetails.channelId : "";
                let _description = da.detailedMetadataSnippets ? da.detailedMetadataSnippets[0].snippetText.runs : da.descriptionSnippet ? da.descriptionSnippet.runs : da.description ? da.description.runs : da.videoDetails ? da.videoDetails.shortDescription : "";
                let icon = da.channelThumbnailSupportedRenderers ? da.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails[0].url : "";
                let tags = da.videoDetails ? da.videoDetails.keywords ? da.videoDetails.keywords : false : [];
                let category = "";
                if (window.location.pathname.split("/")[1] == "watch") {
                    category = ytInitialPlayerResponse?.microformat?.playerMicroformatRenderer?.category;
                }

                let description = "";
                for (const snippet in _description) {
                    if (_description[snippet].navigationEndpoint) {
                        let href = _description[snippet].navigationEndpoint?.commandMetadata?.webCommandMetadata?.url;
                        description += `<a href="${href}">${_description[snippet].text}</a>`;
                    } else {
                        description += _description[snippet].text;
                    }
                }

                description = description.replace(/(?:\r\n|\r|\n)/g, '<br/>');

                return {
                    owner: owner,
                    time: time,
                    views: views,
                    title: title,
                    id: videoId,
                    url: url,
                    description: description,
                    upload: upload,
                    icon: icon,
                    tags: tags,
                    category: category
                };
            },
            escapeHtml: (unsafe) => {
                return unsafe
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            },
            organizeChannelData: (da = Object) => {
                let description = da.descriptionSnippet ? da.descriptionSnippet.runs[0].text : "";
                let title = da.title.simpleText;
                let link = "https://www.youtube.com" + da.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl;
                let thumbnail = da.thumbnail.thumbnails[0].url;
                let video = da.videoCountText ? da.videoCountText.runs : [];
                let videos = video[1] ? video[0].text + video[1].text : video.text;
                let subs = da.subscriberCountText ? da.subscriberCountText.simpleText : "No subscribers";
                let owner = da.shortBylineText.runs[0];

                return {
                    description: description,
                    title: title,
                    link: link,
                    thumbnail: thumbnail,
                    videos: videos,
                    subs: subs,
                    owner: owner
                };
            },
            organizeCommentData: (da = Object) => {

            },
            organizeSubscriptionsData: (da = Object) => {
                if(!da) return {};
                if(!da.items.find(b => b.guideSubscriptionsSectionRenderer)) return [];
                let a = da.items.find(b => b.guideSubscriptionsSectionRenderer).guideSubscriptionsSectionRenderer.items;
                let TAB = [];
                for (let i = 0; i < a.length; i++) {
                    if(a[i].guideEntryRenderer && a[i].guideEntryRenderer.entryData) {
                        let de = a[i].guideEntryRenderer;
                        TAB.push({
                            title: de.formattedTitle.simpleText,
                            id: de.entryData.guideEntryData.guideEntryId,
                            icon: de.thumbnail.thumbnails[0].url
                        });
                    }
                }

                return TAB;
            },
            secret: () => { return alert("Exception occurred at 6F 77 6F 20 66 75 72 72 79"); },
            fullscreenPlayer: (e) => {
                let $ = document.querySelector("#video-player");
                let requestFullScreen = $.requestFullScreen || $.mozRequestFullScreen || $.webkitRequestFullScreen;
                if(!requestFullScreen) return;
                let makeFullscreen = () => {
                    document.querySelector(".playbar-controls_fullscreen").setAttribute("data-state", "1");
                    requestFullScreen.bind($)();
                };
                let unmakeFullscreen = () => {
                    document.querySelector(".playbar-controls_fullscreen").setAttribute("data-state", "0");
                    document.exitFullscreen();
                };
                switch (e) {
                    case "0":
                        makeFullscreen();
                        break;
                    case "1":
                        unmakeFullscreen();
                        break;
                }
            },
            playPause: (e) => {
                switch (e) {
                    case "0":
                        document.cosmicCat.player.playVideo();
                        document.querySelector(".playbar-controls_play").setAttribute("data-state", 1);
                        break;
                    case "1":
                        document.cosmicCat.player.pauseVideo();
                        document.querySelector(".playbar-controls_play").setAttribute("data-state", 0);
                        break;
                }
            },
            calculateLength: (length = Number) => {
                var hours = "";
                var thours = Math.floor(length / 3600);
                var tminutes = Math.floor(length % 3600 / 60);
                var tseconds = Math.floor(length % 3600 % 60);
                tseconds = ('0' + tseconds).slice(-2);
                if(length > 3600) {
                    tminutes = ('0' + tminutes).slice(-2);
                }
                hours = length >= 3600 ? (thours + ":") : "";
                return hours + "" + tminutes + ":" + tseconds;
            },
            Modal: (DOM) => {
                DOM = document.querySelector(DOM);
                if (!DOM.classList.contains("hid")) {
                    DOM.classList.add("hid");
                    DOM.style = "display:none;";
                    return;
                }
                DOM.classList.remove("hid");
                DOM.style = "display:block";
            },
            mutePlayer: (state) => {

            },
            toggleExpandedMasthead: () => {
                let a = document.querySelector("#masthead-expanded");
                if(a.classList.contains("hid")) {
                    a.classList.remove("hid");
                } else {
                    a.classList.add("hid");
                }
            },
            getCookie: (cname) => {
                var name = cname + "=";
                var decodedCookie = decodeURIComponent(document.cookie);
                var ca = decodedCookie.split(';');
                for(let i = 0; i <ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            },
            setCookie: (cname, cvalue, exdays) => {
                const d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                let expires = "expires="+ d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            },
            getSubscription: () => {
                if(BOOL_LOGIN !== true) return false;
                if(window.location.pathname.split("/")[1].match(/channel|user|^c{1}$/i)) {
                    return ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton ? ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton.subscribeButtonRenderer ? ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton.subscribeButtonRenderer.subscribed : false : false;
                }
                if(window.location.pathname.split("/")[1].match(/watch/i)) {
                    return ytInitialData.contents.twoColumnWatchNextResults.results?.results?.contents?.find(a => a.videoSecondaryInfoRenderer)?.videoSecondaryInfoRenderer?.subscribeButton?.subscribeButtonRenderer?.subscribed;
                }
            },
            customTags: (data) => {
                let tags = [];
                let TAGS = data.DESCRIPTION.matchAll(/\[\+\w\+="(\d+|.+)"]/g);
                data.DESCRIPTION = data.DESCRIPTION.replace(/\[\+\w\+="(\d+|.+)"]/g, "");
                for (const tag of TAGS) {
                    if(tag[0].split(/\+/g)[1] == "a" && tag[0].match(/"\d+"/g) && tag[0].split(/"/g)[1] < 101) {
                        tags.push({name: "Age", value: tag[0].split(/"/g)[1]});
                    }
                    if(tag[0].split(/\+/g)[1] == "o" && tag[0].match(/"\w+/g)) {
                        tags.push({name: "Occupation", value: tag[0].split(/"/g)[1]});
                    }
                }

                return tags;
            },
            setVolume: (vol = Number) => {
                let volume = 0;
                switch (true) {
                    case (vol == 0):
                        document.cosmicCat.func.mutePlayer();
                        break;
                    case (vol < 20):
                        volume = 1;
                        break;
                    case (vol < 80):
                        volume = 2;
                        break;
                    case (vol < 100):
                        volume = 3;
                        break;
                    default:
                        volume = 3;
                        break;
                }
                document.querySelector("#video-player").querySelector(".playbar-controls_volume").setAttribute("data-state", volume);
                if(document.cosmicCat.player.isMuted() == true) {document.cosmicCat.player.unMute();}
                document.cosmicCat.player.setVolume(vol);
            },
            waitForElm: async (selector) => {
                while (document.querySelector(selector) == null) {
                    await new Promise(r => requestAnimationFrame(r));
                };
                return document.querySelector(selector);
            },
            likeThis: (ml) => {
                if(BOOL_LOGIN !== true) {
                    if (window.location.pathname.split("/")[1] !== "watch") {
                        document.querySelector("#channel-like-logged-out").classList.remove("hid");
                    }
                    return;
                }
                var update = (math) => {
                    if (window.location.pathname.split("/")[1] == "watch") {
                        var equ = parseInt(document.querySelector("span.likes").innerText.replace(/,/g, ""));
                        var equ2 = parseInt(document.querySelector("span.dislikes").innerText.replace(/,/g, ""));
                        switch (math) {
                            case 0:
                                equ -= 1;
                                equ2 += 1;
                                break;
                            case 1:
                                equ += 1;
                                equ2 -= 1;
                                break;
                        }
                        document.querySelector("span.likes").innerText = equ.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        if(document.querySelector("#watch-unlike").classList.contains("unliked")) {
                            document.querySelector("span.dislikes").innerText = equ2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }
                    }
                };
                if(document.querySelector("#watch-like").classList.contains("liked")) {
                    update(0);
                    document.cosmicCat.func.getApi("/youtubei/v1/like/removelike", `target:{videoId: "${ml}"}`);
                    return document.querySelector("#watch-like").classList.remove("liked");
                }
                update(1);
                document.cosmicCat.func.getApi("/youtubei/v1/like/like", `target:{videoId: "${ml}"}`);
                document.querySelector("#watch-like").classList.add("liked");
                document.querySelector("#watch-unlike").classList.remove("unliked");
            },
            dislikeThis: (ml) => {
                if(BOOL_LOGIN !== true) {
                    if (window.location.pathname.split("/")[1] !== "watch") {
                        document.querySelector("#channel-like-logged-out").classList.remove("hid");
                    }
                    return;
                }
                var update = (math) => {
                    if (window.location.pathname.split("/")[1] == "watch") {
                        var equ = parseInt(document.querySelector("span.dislikes").innerText.replace(/,/g, ""));
                        var equ2 = parseInt(document.querySelector("span.likes").innerText.replace(/,/g, ""));
                        switch (math) {
                            case 0:
                                equ -= 1;
                                equ2 += 1;
                                break;
                            case 1:
                                equ += 1;
                                equ2 -= 1;
                                break;
                        }
                        document.querySelector("span.dislikes").innerText = equ.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        if(document.querySelector("#watch-like").classList.contains("liked")) {
                            document.querySelector("span.likes").innerText = equ2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }
                    }
                };
                if(document.querySelector("#watch-unlike").classList.contains("unliked")) {
                    update(0);
                    document.cosmicCat.func.getApi("/youtubei/v1/like/removelike", `target:{videoId: "${ml}"}`);
                    return document.querySelector("#watch-unlike").classList.remove("unliked");
                }
                update(1);
                document.cosmicCat.func.getApi("/youtubei/v1/like/dislike", `target:{videoId: "${ml}"}`);
                document.querySelector("#watch-unlike").classList.add("unliked");
                document.querySelector("#watch-like").classList.remove("liked");
            },
            loadPlaynavVideo: (id = String) => {
                if(!id) return error("loadPlaynavVideo: No ID was specified");
                var data = new Promise(async resolve => {
                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", "https://www.youtube.com/watch?v=" + id);
                    xhr.onload = () => {
                        let a = JSON.parse(xhr.response.split("var ytInitialPlayerResponse = ")[1].split(";var")[0]).videoDetails;
                        if(!a) return resolve(undefined);
                        return resolve({description: a.shortDescription, timestamp: a.lengthSeconds});
                    };
                    xhr.send();
                });
                let xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com/${window.location.pathname}/videos`);
                xhr.onload = async(e) => {
                    var a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs;
                    try {
                        a = a.find(a => a.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'videos');
                    } catch(err) {
                        return error("loadPlaynavVideo: Can't find video tab");
                    }
                    if(!a.tabRenderer) return;
                    var b = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items;
                    try {
                        b = b.find(a => a.gridVideoRenderer.videoId === id);
                        b = document.cosmicCat.func.organizeVideoData(b.gridVideoRenderer);
                    } catch(err) {
                        return error("loadPlaynavVideo: Video does not exist or can't be found");
                    }
                    let d = await data;
                    document.querySelector("#playnav-curvideo-title a").removeAttribute("onclick");
                    document.querySelector("#playnav-curvideo-title a").setAttribute("href", "/watch?v=" + b.id);
                    document.querySelector("#playnav-curvideo-title a").innerText = b.title;
                    document.querySelector("#playnav-curvideo-info-line span[dir='ltr']").innerText = b.views[1];
                    document.querySelector("#playnav-curvideo-description").innerText = d.description;
                    document.querySelector("#playnav-curvideo-view-count").innerText = b.views[0];
                    document.querySelector("#watch-like").setAttribute("data-watchid", b.id);
                    document.querySelector("#watch-unlike").setAttribute("data-watchid", b.id);
                    document.querySelector("#timestamp_total").innerText = document.cosmicCat.func.calculateLength(parseInt(d.timestamp));
                    document.querySelector("#playnav-watch-link").href = "https://www.youtube.com/watch?v=" + b.id;
                    document.querySelector(".playbar-controls_play").setAttribute("data-state", "1");
                    document.cosmicCat.player.loadVideoById(b.id, 1);
                };

                xhr.onerror = () => {
                    console.error("** An error occurred during the XMLHttpRequest");
                };

                xhr.send();
            },
            subscribe: async() => {
                if(BOOL_LOGIN !== true) {
                    if (window.location.pathname.split("/")[1] !== "watch") {
                        document.querySelector("#subscription-button-module-menu").classList.remove("hid");
                    }
                    return;
                }
                if((ytInitialData.metadata ? ytInitialData.metadata.channelMetadataRenderer.title : "") == document.cosmicCat.data.name) return document.cosmicCat.func.showModal("No need to subscribe to yourself!");
                if((ytInitialPlayerResponse ? ytInitialPlayerResponse.videoDetails.author : "") == document.cosmicCat.data.name) return document.cosmicCat.func.showModal("No need to subscribe to yourself!");
                if(BOOL_SUBSCRIBE == null) BOOL_SUBSCRIBE = ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton.subscribeButtonRenderer.subscribed;

                let ytapi = ytInitialData.metadata ? ytInitialData.metadata.channelMetadataRenderer.externalId : (ytInitialPlayerResponse) ? ytInitialPlayerResponse.videoDetails.channelId : "";
                var sub = BOOL_SUBSCRIBE;
                var button = document.querySelector(".yt-subscription-button") ? ".yt-subscription-button" : ".subscribe-button";
                var text = "";

                switch(sub) {
                    case false:
                        await document.cosmicCat.func.getApi("/youtubei/v1/subscription/subscribe", `channelIds: ["${ytapi}"]`);
                        text = localizeString("buttons.subscribed");
                        document.querySelector(button).classList.add("subscribed");
                        BOOL_SUBSCRIBE = true;
                        break;
                    case true:
                        await document.cosmicCat.func.getApi("/youtubei/v1/subscription/unsubscribe", `channelIds: ["${ytapi}"]`);
                        text = localizeString("buttons.subscribe");
                        document.querySelector(button).classList.remove("subscribed");
                        BOOL_SUBSCRIBE = false;
                        break;
                }

                document.querySelectorAll(`${button} .yt-uix-button-content`).forEach((a) => { a.innerText = text;});
            },
            preProPos: () => {
                let track = (document.cosmicCat.player.getCurrentTime() / document.cosmicCat.player.getDuration() * 100) + "%";
                document.querySelector(".playbar-scrubbar.track_played").style.width = track;
                document.querySelector(".playbar-scrubbar.track_handle").style.left = track;
            },
            showModal: (text) => {
                alert(text);
            },
            getSApiSidHash: async () => {
                function sha1(str) {
                    return window.crypto.subtle.digest("SHA-1", new TextEncoder("utf-8").encode(str)).then(buf => {
                        return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
                    });
                }

                const MS = Date.now().toString();
                const TIMESTAMP = MS.substring(0, MS.length - 3);
                const digest = await sha1(`${TIMESTAMP} ${document.cosmicCat.func.getCookie("SAPISID")} https://www.youtube.com`);

                return `SAPISIDHASH ${TIMESTAMP}_${digest}`;
            },
            parseLang: (la) => {
                return document.cosmicCat.data.lang[la];
            },
            parseCoun: (cc) => {
                let list = {
                    "DK": "Danmark"
                };
                return list[cc];
            }
        },
        Account: {
            fetch: async () => {
                let isLoggedIn = await fetch("/getAccountSwitcherEndpoint").then(re => re.text()).then(re => {return JSON.parse(re.slice(5))}).catch(err => error(err));

                try {
                    BOOL_LOGIN = !isLoggedIn.ok;
                } catch {
                    BOOL_LOGIN = false;
                }

                if(BOOL_LOGIN == true) {
                    let popup = isLoggedIn.data.actions[0].getMultiPageMenuAction.menu.multiPageMenuRenderer.sections[0].accountSectionListRenderer;
                    let accountItem = popup.contents[0].accountItemSectionRenderer.contents.find(a => a.accountItem.isSelected == true)?.accountItem;
                    let google = popup.header.googleAccountHeaderRenderer;
                    document.cosmicCat.data.loggedin = true;
                    document.cosmicCat.data.name = accountItem.accountName.simpleText;
                    document.cosmicCat.data.pfp = accountItem.accountPhoto.thumbnails[0].url;
                    document.cosmicCat.data.link = accountItem.navigationEndpoint;
                    document.cosmicCat.data.email = google.email.simpleText;
                }
            }
        },
        AJAX: {
            post: async function(url, params) {
                let Authorization = "";
                params = params ? params + "," : "";
                let click = JSON.stringify(yt.config_.INNERTUBE_CONTEXT.clickTracking),
                    client = JSON.stringify(yt.config_.INNERTUBE_CONTEXT.client),
                    request = JSON.stringify(yt.config_.INNERTUBE_CONTEXT.request),
                    user = JSON.stringify(yt.config_.INNERTUBE_CONTEXT.user);
                let body = `{${params} context: {clickTracking: ${click}, client: ${client}, clientScreenNonce: "${yt.config_["client-screen-nonce"]}", user: ${user}, androidSdkVersion: "25", request: ${request}}}`;

                // Check if logged in
                if (document.cosmicCat.func.getCookie("SAPISID")) {
                    Authorization = await document.cosmicCat.func.getSApiSidHash();
                }

                // Fetch
                const response = await fetch("https://www.youtube.com" + url + "?key=" + yt.config_.INNERTUBE_API_KEY + "&prettyPrint=false", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Goog-AuthUser": "0",
                        "X-Goog-Visitor-Id": yt.config_.INNERTUBE_CONTEXT.client.visitorData,
                        "X-Youtube-Client-Version": "17.33",
                        "X-Youtube-Bootstrap-Logged-In": "true",
                        "X-Youtube-Client-Name": "ANDROID",
                        "X-Origin": "https://www.youtube.com",
                        Authorization
                    },
                    body: body
                })
                .catch(err => {
                    console.error("[AJAX] Something went wrong:", err);
                });
                return response.json();
            }
        },
        toggleElm: function (params) {
            const elm = document.querySelector(params);

            if (!params) return Error("toggleElm", params + "is not a valid HTMLElement");
            console.debug("toggleElm", "toggled", params);

            if (elm.classList.contains("hid")) {
                elm.classList.remove("hid");
            } else {
                elm.classList.add("hid");
            }
        },
        Utils: {
            convertXHRtoJSON: (data) => {
                return data.then(da => {
                    try {
                        return JSON.parse(da.split("var ytInitialData = ")[1].split(";</script>")[0]);
                    } catch {
                        return {error: 404};
                    }
                });
            },
            browseTabs: {
                find: (data, param) => {
                    try {
                        return data.contents.twoColumnBrowseResultsRenderer.tabs.find(b => b.tabRenderer ? b.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === param : {});
                    } catch {
                        return {error: 404};
                    }
                },
                content: (data) => {
                    try {
                        return data.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents;
                    } catch {
                        return {error: 404};
                    }
                }
            },
            Sort: {
                channelData: (data) => {
                    console.log(data);

                    let id = data.channelId;
                    let name = data.title ? data.title.simpleText : undefined;
                    let avatars = data.avatar ? data.avatar.thumbnails : undefined;
                    let artist = data.artistBio ? "<br/><br/>" + data.artistBio.simpleText.replace(/(?:\r\n|\r|\n)/g, "<br/>") : "";
                    let country = data.country ? data.country.simpleText : undefined;
                    let joined = data.joinedDateText ? data.joinedDateText.runs[1].text : undefined;
                    let views = data.viewCountText ? data.viewCountText.simpleText.split(" ")[0] : undefined;
                    let links = data.primaryLinks ? data.primaryLinks : undefined;
                    let description = data.description ? data.description.simpleText.replace(/(?:\r\n|\r|\n)/g, "<br/>") : undefined;

                    //collection.name.COUNTRY = b.countryLabel ? b.countryLabel.runs[0].text.replace(/(?:\r\n|\r|\n)|( )|:/g, "") : undefined;
                    //collection.name.JOIN = b.joinedDateText ? b.joinedDateText.runs[0].text.split(" ")[0] : undefined;
                    //collection.name.VIEWS = b.viewCountText ? b.viewCountText.simpleText.split(" ")[1].charAt(0).toUpperCase() + b.viewCountText.simpleText.split(" ")[1].slice(1) : undefined;

                    return {
                        id: id,
                        name: name,
                        avatar: avatars,
                        artistBio: artist,
                        country: country,
                        joined: joined,
                        views: views,
                        links: links,
                        description: description
                    }
                },
                feedImagesData: (data) => {
                    let stor = "";

                    for (let i = 0; i < data.images.length; i++) {
                        stor += `<img src="${data.images[i].backstageImageRenderer.image.thumbnails[0].url}"/>`;
                    }

                    return stor;
                },
                feedVideoData: (data) => {
                    let {id, title, time} = document.cosmicCat.func.organizeVideoData(data);
                    return `<div class="playnav-item playnav-video">
<div style="display:none" class="encryptedVideoId">${id}</div>
<div class="selector"></div>
<div class="content">
<div class="playnav-video-thumb">
<a href="https://www.youtube.com/watch?v=${id}" onclick="document.cosmicCat.func.loadPlaynavVideo('${id}');return false;" class="ux-thumb-wrap">
<span class="video-thumb ux-thumb-96 ">
<span class="clip">
<img src="//i1.ytimg.com/vi/${id}/default.jpg" alt="Thumbnail" class="" onclick="document.cosmicCat.func.loadPlaynavVideo('${id}');return false;" title="${title}">
</span>
</span>
<span class="video-time">${time}</span>
</a>
</div>
<div class="playnav-video-info">
<a href="https://www.youtube.com/watch?v=${id}" class="playnav-item-title ellipsis" onclick="document.cosmicCat.func.loadPlaynavVideo('${id}');return false;">
<span dir="ltr">${title}</span>
</a>
<div style="display:none" id="playnav-video-play-uploads-12">${id}</div>
</div>
</div>
</div>`;
                },
                feedData: (data) => {
                    let filter = (j) => {
                        let img = j.backstageAttachment;
                        if(!img) return '';
                        let stor = "";
                        for (const obj in img) {
                            switch (obj) {
                                case 'postMultiImageRenderer':
                                    stor = document.cosmicCat.Sort.feedImagesData(img.postMultiImageRenderer);
                                    break;
                                case 'backstageImageRenderer':
                                    stor = '<img src="' + img.backstageImageRenderer.image.thumbnails[0].url + '">';
                                    break;
                                case 'videoRenderer':
                                    //stor = document.cosmicCat.Sort.feedVideoData(img.videoRenderer);
                                    break;
                            }
                        }
                        return stor;
                    };

                    let post = data.backstagePostThreadRenderer.post.sharedPostRenderer ? data.backstagePostThreadRenderer.post.sharedPostRenderer.originalPost.backstagePostRenderer : data.backstagePostThreadRenderer.post.backstagePostRenderer;
                    let text = post.contentText.runs ? post.contentText.runs[0].text : "";
                    let images = filter(post);
                    let author = post.authorText.runs[0].text;
                    let timestamp = post.publishedTimeText.runs[0].text;

                    return {
                        text: text,
                        images: images,
                        author: author,
                        timestamp: timestamp
                    };
                }
            }
        },
        Comments: {
            init: async function (continuation) {
                if (!continuation) return document.cosmicCat.toggleElm("#comments-view");

                let api = await document.cosmicCat.AJAX.post("/youtubei/v1/next", `continuation: "${continuation}"`);
                if (!api) return this.abort();

                if(api.responseContext.mainAppWebResponseContext.loggedOut == false && document.querySelector("#session").getAttribute("data-yes") !== "yes") {
                    document.querySelector("#session").setAttribute("data-yes", "yes");
                    document.querySelector("#session").value = api.onResponseReceivedEndpoints[0].reloadContinuationItemsCommand.continuationItems[0].commentsHeaderRenderer.createRenderer.commentSimpleboxRenderer.submitButton.buttonRenderer.serviceEndpoint.createCommentEndpoint.createCommentParams;
                }

                const sortMenuTokens = this.sortMenuTokens(api);
                let sortedCommentsArray = this.sortCommentsIntoArray(api);

                if (!sortedCommentsArray) return this.abort();

                sortedCommentsArray = sortedCommentsArray.splice(0, 2);

                const comments = this.sortComments(sortedCommentsArray, "top");

                document.querySelector(".comment-list.top").innerHTML = comments.result;

                document.cosmicCat.toggleElm(".comment-list.top");
                await document.cosmicCat.Comments.load(sortMenuTokens.newest);

            },
            load: async function (continuation) {
                if (!continuation) return document.cosmicCat.toggleElm("#comments-view");

                let api = await document.cosmicCat.AJAX.post("/youtubei/v1/next", `continuation: "${continuation}"`);
                if (!api) return this.abort();

                let sortedCommentsArray = this.sortCommentsIntoArray(api);

                const comments = this.sortComments(sortedCommentsArray, "all");

                this.nextNumberButton(continuation, 1);

                document.querySelector(".comment-list.all").innerHTML = comments.result;

                document.cosmicCat.toggleElm(".comment-list.all");
                document.cosmicCat.toggleElm("#comments-loading");
            },
            abort: function() {
                document.cosmicCat.toggleElm("#comments-loading");
            },
            sortComments: function (params, am) {
                let result = {result: "", con: ""};
                for (let i = 0; i < params.length; i++) {
                    if (params[i].commentThreadRenderer) {
                        if (am == "top" || params[i].commentThreadRenderer.renderingPriority !== "RENDERING_PRIORITY_PINNED_COMMENT"){
                            let ap = document.cosmicCat.Comments.organizeData(params[i].commentThreadRenderer.comment.commentRenderer);
                            result.result += ap;
                        }
                    }
                    if (params[i].continuationItemRenderer && am == "all") {
                        const aaaa = document.querySelector("#next-btn");
                        if (aaaa.classList.contains("hid")) {
                            document.cosmicCat.toggleElm("#next-btn");
                        }
                        aaaa.setAttribute("data-token", params[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token);
                        result.con += `${params[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token}`;
                    }
                }

                return result;
            },
            sortCommentsIntoArray: function (api) {
                let obj = [];

                try {
                    obj = api.onResponseReceivedEndpoints[0]?.appendContinuationItemsAction.continuationItems;
                } catch {
                    obj = api.onResponseReceivedEndpoints[1]?.reloadContinuationItemsCommand.continuationItems;
                }

                return obj;
            },
            sortMenuTokens: function (obj) {
                return {
                    top: obj.onResponseReceivedEndpoints[0].reloadContinuationItemsCommand.continuationItems[0].commentsHeaderRenderer.sortMenu.sortFilterSubMenuRenderer.subMenuItems[0].serviceEndpoint.continuationCommand.token,
                    newest: obj.onResponseReceivedEndpoints[0].reloadContinuationItemsCommand.continuationItems[0].commentsHeaderRenderer.sortMenu.sortFilterSubMenuRenderer.subMenuItems[1].serviceEndpoint.continuationCommand.token
                };
            },
            nextNumberButton: function(continuation, number) {
                number = Number(number);
                commCount = number;
                let ana = () => {
                    document.querySelector(".yt-uix-button-toggled").classList.remove("yt-uix-button-toggled");
                    document.querySelector(`[data-page='${number}']`).classList.add("yt-uix-button-toggled");
                    let ded = document.querySelector("#next-btn");
                    ded.setAttribute("data-page", number + 1);
                };
                if (document.querySelector(`.yt-pp[data-page='${number}']`)) {
                    ana();
                } else {
                    if (number !== 0) {
                        let abc = document.querySelector(".yt-uix-pager");
                        let bcd = document.querySelector(".yt-uix-button-toggled");
                        let def = document.createElement("a");
                        let ded = document.querySelector("#next-btn");
                        def.setAttribute("class", "yt-uix-button yt-uix-sessionlink yt-uix-pager-button yt-uix-button-toggled yt-uix-button-default yt-pp");
                        def.setAttribute("data-page", number);
                        def.setAttribute("onclick", "document.cosmicCat.Comments.next(this.getAttribute('data-token'), this.getAttribute('data-page'))");
                        def.setAttribute("aria-label", `Go to page ${number}`);
                        def.setAttribute("data-token", continuation);
                        def.innerHTML = `<span class="yt-uix-button-content">${number}</span>`;
                        ded.setAttribute("data-page", commCount + 1);
                        if (bcd) {
                            bcd.classList.remove("yt-uix-button-toggled");
                        }
                        abc.insertBefore(def, document.querySelector("#next-btn"));
                    }
                }
            },
            organizeData: function (da) {
                if(!da) return {};
                let author = da.authorText.simpleText;
                let id = da.commentId;
                let text_ = da.contentText.runs;
                let text = "";
                let time = da.publishedTimeText.runs[0].text;
                let url = da.authorEndpoint.browseEndpoint.canonicalBaseUrl;
                let authorId = da.authorEndpoint.browseEndpoint.browseId;
                var RAW_COUNT = da.voteCount ? da.voteCount.accessibility ? (da.voteCount.accessibility.accessibilityData ? parseInt(da.voteCount.accessibility.accessibilityData.label.replace(/[^0-9.]/g, '')) : '') : (da.voteCount.accessibility ? parseInt(da.voteCount.accessibility.label.replace(/[^0-9.]/g, '')) : '') : '';
                //var PRESENTABLE_COUNT = (RAW_COUNT + (liketoggled ? -1 : 0)) ? (RAW_COUNT + (liketoggled ? -1 : 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
                let likes = da.voteCount ? `<span dir="ltr" class="comments-rating-positive" title="">
${RAW_COUNT}
<img class="comments-rating-thumbs-up" style="vertical-align: bottom !important;" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif">
</span>` : "";
                //document.cosmicCat.func.escapeHtml(da.contentText.runs[0].text);
                for (let i = 0; i < text_.length; i++) {
                    text += text_[i].text;
                }

                text = text.replace(/\n|\r/g, "<br/>");

                let __a = [[], []];

                if(da.cum !== "a") {
                    __a[0] = `<li class="comment yt-tile-default" data-author-id="${authorId}" data-id="${id}" data-score="-1">`;
                    __a[1] = `</li>`;
                }

                let result = `${__a[0]}<div class="comment-body">
<div class="content-container">
<div class="content">
<div class="comment-text" dir="ltr">
<p>${text}</p>
</div>
<p class="metadata">
<span class="author">
<a href="${url}" class="yt-uix-sessionlink yt-user-name" data-sessionlink="" dir="ltr">${author}</a>
</span>
<span class="time" dir="ltr">
<a dir="ltr" href="https://www.youtube.com/watch?v=${id}&lc=${id}">${time}</a>
</span>
${likes}
</p>
</div>
<div class="comment-actions">
<span class="yt-uix-button-group">
<button type="button" class="start comment-action-vote-up comment-action yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" onclick=";return false;" title="Vote Up" data-action="vote-up" data-tooltip-show-delay="300" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-comment-vote-up" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Vote Up">
<span class="yt-valign-trick"></span>
</span>
</button><button type="button" class="end comment-action-vote-down comment-action yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" onclick=";return false;" title="Vote Down" data-action="vote-down" data-tooltip-show-delay="300" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-comment-vote-down" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Vote Down">
<span class="yt-valign-trick"></span>
</span>
</button>
</span>
<span class="yt-uix-button-group">
<button type="button" class="start comment-action yt-uix-button yt-uix-button-default" onclick=";return false;" data-action="reply" role="button">
<span class="yt-uix-button-content">Reply </span>
</button><button type="button" class="end yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="true" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant="">
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
<div class=" yt-uix-button-menu yt-uix-button-menu-default" style="display: none;">
<ul>
<li class="comment-action-remove comment-action" data-action="remove">
<span class="yt-uix-button-menu-item">Remove</span>
</li>
<li class="comment-action" data-action="flag">
<span class="yt-uix-button-menu-item">Flag for spam</span>
</li>
<li class="comment-action-block comment-action" data-action="block">
<span class="yt-uix-button-menu-item">Block User</span>
</li>
<li class="comment-action-unblock comment-action" data-action="unblock">
<span class="yt-uix-button-menu-item">Unblock User</span>
</li>
</ul>
</div>
</button>
</span>
</div>
</div>
</div>
${__a[1]}`;

                return result;
            },
            next: async function (continuation, number) {
                if (!continuation) return document.cosmicCat.toggleElm("#comments-view");
                document.cosmicCat.toggleElm("#comments-loading");

                let api = await document.cosmicCat.AJAX.post("/youtubei/v1/next", `continuation: "${continuation}"`);
                if (!api) return this.abort();

                let sortedCommentsArray = this.sortCommentsIntoArray(api);

                const comments = this.sortComments(sortedCommentsArray, "all");

                console.debug(number);

                this.nextNumberButton(continuation, number);

                document.querySelector(".comment-list.all").innerHTML = comments.result;

                document.cosmicCat.toggleElm("#comments-loading");
            },
            Form: {
                init: function() {
                    if(document.querySelector(".comments-post").classList.contains("has-focus")) return;
                    document.querySelector(".comments-post").classList.add("has-focus");
                    let fu = (e) => {
                        let l = e.target.textLength;
                        let L = 500;
                        let rg = L - l;
                        if (rg <= 0) {
                            document.querySelector(".comments-textarea").value = document.querySelector(".comments-textarea").value.substring(0, L);
                        }
                        document.querySelector(".comments-remaining-count").innerText = rg<=0?0:rg;
                    };
                    document.querySelector(".comments-textarea").addEventListener("keyup", fu);
                    document.querySelector(".comments-textarea").addEventListener("input", fu);
                },
                uninit: function() {
                    if(!document.querySelector(".comments-post").classList.contains("has-focus")) return;
                    let _dom = document.querySelector(".comments-post");
                    let _com = document.querySelector(".comments-textarea");
                    document.querySelector(".comments-remaining-count").innerText = "500";
                    _dom.classList.remove("has-focus");
                    _com.value = "";
                    _com.textContent = "";
                }
            }
        },
        Channels: {
            customTags: (data) => {
                if (!data) return [];
                let tags = [];
                let TAGS = data.matchAll(/\[\+\w\+="(\d+|.+)"]/g);
                data = data.replace(/\[\+\w\+="(\d+|.+)"]/g, "");
                for (const tag of TAGS) {
                    if(tag[0].split(/\+/g)[1] == "a" && tag[0].match(/"\d+"/g) && tag[0].split(/"/g)[1] < 101) {
                        tags.push({name: "Age", value: tag[0].split(/"/g)[1]});
                    }
                    if(tag[0].split(/\+/g)[1] == "o" && tag[0].match(/"\w+/g)) {
                        tags.push({name: "Occupation", value: tag[0].split(/"/g)[1]});
                    }
                }

                return tags;
            },
            renderPage: (arg, data) => {
                let channel1 = () => {
                };
                let channel2 = () => {
                    document.querySelector("#www-yt-core").href = "//s.ytimg.com/yt/cssbin/www-refresh-vflzVUPsm.css";
                    document.head.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-channel_new-vflrWkVe_.css"><link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-the-rest-vflNb6rAI.css">';

                    let thelegend = "";
                    if (window.location.pathname.split("/")[2].match(/technoblade/gi)) {
                        thelegend = `<div id="the-blood-king">Long live the blood king🐷❤️</div>`;
                    }

                    let videoData = document.cosmicCat.func.organizeVideoData(data.HOMEVIDEO);
                    let tags = document.cosmicCat.Channels.customTags(data.info.description);

                    let OBJ_SECTIONS = "";
                    for (let i = 0; i < tags.length; i++) {
                        OBJ_SECTIONS += `<div class="show_info outer-box-bg-as-border"><div class="profile-info-label">${localizeString("customtag." + tags[i].name.toLowerCase())}</div><div class="profile-info-value" id="profile_show_${tags[i].name}">${tags[i].value}</div><div class="cb"></div></div>`;
                    }

                    // load videos
                    let videos = "";
                    for (let i = 0; i < data.videos.length; i++) {
                        let {owner, time, views, title, id, url} = data.videos[i];
                        videos += `<div id="playnav-video-play-uploads-12-${id}" class="playnav-item playnav-video">
<div style="display:none" class="encryptedVideoId">${id}</div>
<div id="playnav-video-play-uploads-12-${id}-selector" class="selector"></div>
<div class="content">
<div class="playnav-video-thumb">
<a href="https://www.youtube.com/watch?v=${id}" onclick="document.cosmicCat.func.loadPlaynavVideo('${id}');return false;" class="ux-thumb-wrap contains-addto">
<span class="video-thumb ux-thumb-96 ">
<span class="clip">
<img src="//i1.ytimg.com/vi/${id}/default.jpg" alt="Thumbnail" class="" onclick="document.cosmicCat.func.loadPlaynavVideo('${id}');return false;" title="${title}">
</span>
</span>
<span class="video-time">${time}</span>
<span dir="ltr" class="yt-uix-button-group addto-container short video-actions">
<button type="button" class="master-sprite start yt-uix-button yt-uix-button-short yt-uix-tooltip" onclick=";return false;" title="" role="button" aria-pressed="false">
<img class="yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
<span class="yt-uix-button-content">
<span class="addto-label">${localizeString("buttons.addto")}</span>
</span>
</button>
<button type="button" class="end yt-uix-button yt-uix-button-short yt-uix-tooltip" onclick=";return false;" title="" role="button" aria-pressed="false">
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</button>
</span>
</a>
</div>
<div class="playnav-video-info">
<a href="https://www.youtube.com/watch?v=${id}" class="playnav-item-title ellipsis" onclick="document.cosmicCat.func.loadPlaynavVideo('${id}');return false;" id="playnav-video-title-play-uploads-12-${id}">
<span dir="ltr">${title}</span>
</a>
<div class="metadata">
<span dir="ltr">${views[0]}  -  ${views[1]}</span>
</div>
<div style="display:none" id="playnav-video-play-uploads-12">${id}</div>
</div>
</div>
</div>`;
                    }

                    let recentfeed = "";
                    for (let i = 0; i < data.feed.length; i++) {
                        let u = '<tr id="feed_divider"><td colspan="3" class="outer-box-bg-as-border divider">&nbsp;</td>';
                        recentfeed += `
<tr id="feed_item" valign="top">
<td class="feed_icon">
<img class="master-sprite icon-BUL" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</td>
<td>
<div class="feed_title">
<div dir="ltr">
<span dir="ltr">${data.feed[i].author}</span>
<span dir="ltr"></span>
<span class="bulletin_message">${data.feed[i].text}</span>
</div>
<div>
${data.feed[i].images}
</div>
<div>
<span class="timestamp">(${data.feed[i].timestamp})</span>
</div>
</div>
</td>
</tr>
${u}</tr>`;
                    }
                    let OBJ_SUBS = ``;
                    if(data?.SUBSCRIPTIONS?.array?.length > 1) {
                        let peeps = "";
                        let pei = [[], []];
                        for (let i = 0; i < data.SUBSCRIPTIONS.array.length; i++) {
                            let name = data.SUBSCRIPTIONS.array[i].title.simpleText.slice(0, 7) + "...";
                            let string = `<div class="user-peep" style="width:33%;">
<center>
<div class="user-thumb-large link-as-border-color">
<div>
<a href="https://www.youtube.com/channel/${data.SUBSCRIPTIONS.array[i].channelId}"><img src="${data.SUBSCRIPTIONS.array[i].thumbnail.thumbnails[0].url}"></a>
</div>
</div>
<a href="https://www.youtube.com/channel/${data.SUBSCRIPTIONS.array[i].channelId}" title="${data.SUBSCRIPTIONS.array[i].title.simpleText}" rel="following">${name}</a>
</center>
</div>`;
                            if(i < 6) {
                                pei[0].push(string);
                            } else {
                                pei[1].push(string);
                            }
                        }
                        let ueu = "";
                        let uwu = "";
                        for (let i = 0; i < pei[1].length; i++) {
                            ueu += pei[1][i];
                        }
                        for (let i = 0; i < pei[0].length; i++) {
                            uwu += pei[0][i];
                        }

                        let to = `<div class="hid">${ueu}</div>`;

                        peeps = uwu + to;

                        OBJ_SUBS = `<div class="inner-box" id="user_subscriptions" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
<div style="zoom:1">
<div class="box-title title-text-color">${localizeString("personal.subscriptions")} (<a href="?view=subscriptions" class="headersSmall" name="channel-box-item-count">${data.SUBSCRIPTIONS.length}</a>)</div>
<div class="box-editor">
<div style="float:right"></div>
</div>
<div class="cb"></div>
</div>
<div id="user_subscriptions-messages" class="hid"></div>
<div id="user_subscriptions-body">
<div style="zoom:1;margin: 0 -12px">
${peeps}
<div style="clear:both;font-height:1px"></div>
</div>
<div>
<div style="font-size: 12px; text-align: right; margin-top: 7px;">
<b><a name="channel-box-see-all" href="?view=subscriptions">${localizeString("global.seeall")}</a></b>
</div>
</div>
</div>
<div class="clear"></div>
</div>`;
                    }
                    let OBJ_views = "";
                    if(data.info.views !== undefined) {
                        OBJ_views = `<div class="show_info outer-box-bg-as-border"><div class="profile-info-label">${(Number(data.info.views.replace(/,|./g, "")) < 1) ? localizeString("about.viewedcounts") : localizeString("about.viewedcount")}</div><div class="profile-info-value" id="profile_show_viewed_count">${data.info.views}</div><div class="cb"></div></div>`;
                    }
                    let OBJ_join = "";
                    if(data.info.joined !== undefined) {
                        OBJ_join = `<div class="show_info outer-box-bg-as-border"><div class="profile-info-label">${localizeString("about.membersince")}</div><div class="profile-info-value" id="profile_show_member_since">${data.info.joined}</div><div class="cb"></div></div>`;
                    }
                    let OBJ_subcount = "";
                    if(data.info.subs !== undefined) {
                        OBJ_subcount = `<div class="show_info outer-box-bg-as-border"><div class="profile-info-label">${(Number(data.SUBCOUNT.replace(/,|./g, "")) > 1) ? localizeString("about.subs") : localizeString("about.sub")}</div><div class="profile-info-value" id="profile_show_subscriber_count">${data.SUBCOUNT}</div><div class="cb"></div></div>`;
                    }
                    let OBJ_country = "";
                    if(data.info.country !== undefined) {
                        OBJ_country = `<div class="show_info outer-box-bg-as-border"><div class="profile-info-label">${localizeString("about.country")}</div><div class="profile-info-value" id="profile_show_country">${data.info.country}</div><div class="cb"></div></div>`;
                    }
                    var OBJ_USERPROFILE = `<div id="user_profile" class="inner-box" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
<div class="box-title title-text-color">Profile</div>
<div class="cb"></div>
<div id="user_profile-body">
<div class="profile_info vcard">
${OBJ_views}
${OBJ_join}
${OBJ_subcount}
${OBJ_country}
${OBJ_SECTIONS}
<div class="show_info outer-box-bg-as-border" style="border-bottom-width:1px;margin-bottom:4px;line-height:140%" dir="ltr">${data.info.description}${data?.INFO?.string?.BIO}</div>
</div>
</div>
<div class="cb"></div>
</div>`;
                    var OBJ_PLAYNAVA = `<div id="playnav-body" style="position: inherit;">
<div id="playnav-player" class="playnav-player-container" style="visibility: visible; left: 0px;position: inherit;">
<movie-player id="video-player"></movie-player>
</div>
<div id="playnav-playview" class="" style="display: block;position: absolute;height: 0;">
<div id="playnav-left-panel" style="display: block;">
<div id="playnav-video-details">
<div id="playnav-bottom-links">
<div id="playnav-bottom-links-clip" class="playnav-bottom-links-clip">
<table>
<tbody>
<tr>
<td id="playnav-panel-tab-info" class="panel-tab-selected">
<table class="panel-tabs">
<tbody>
<tr>
<td class="panel-tab-title-cell">
<div class="playnav-panel-tab-icon" id="panel-icon-info" onclick="playnav.selectPanel('info')"></div>
<div class="playnav-bottom-link" id="info-bottom-link">
<a href="javascript:;" onclick="playnav.selectPanel('info')">Info</a>
</div>
<div class="spacer">&nbsp;</div>
</td>
</tr>
<tr>
<td class="panel-tab-indicator-cell inner-box-opacity">
<div class="panel-tab-indicator-arrow" style="border-bottom-color: rgb(238, 238, 255) !important;"></div>
</td>
</tr>
</tbody>
</table>
</tr>
</tbody>
</table>
</div>
<div class="cb"></div>
<div class="playnav-video-panel inner-box-colors border-box-sizing" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
<div id="playnav-video-panel-inner" class="playnav-video-panel-inner border-box-sizing" style="overflow: auto;">
<div id="playnav-panel-info" class="scrollable" style="display: block;">
<div id="channel-like-action">
<div id="channel-like-buttons">
<button title="I like this" type="button" class="yt-uix-button yt-uix-tooltip" data-watchid="${videoData.id}" onclick="document.cosmicCat.func.likeThis(this.getAttribute('data-watchid'));return false;" id="watch-like" role="button" aria-pressed="false">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-like" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content">Like</span>
</button>
&nbsp;
<button title="I dislike this" type="button" class="yt-uix-button yt-uix-tooltip yt-uix-button-empty" data-watchid="${videoData.id}" onclick="document.cosmicCat.func.dislikeThis(this.getAttribute('data-watchid'));return false;" id="watch-unlike" role="button" aria-pressed="false">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-unlike" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</button>
</div>
<div id="channel-like-logged-out" class="hid">
<strong>
<a href="${document.cosmicCat.data.loginUrl}">Sign in</a> or <a href="https://www.youtube.com/signup">sign up</a> now!
</strong>
</div>
</div>
<div id="playnav-curvideo-title" class="inner-box-link-color" dir="ltr">
<a style="cursor:pointer;margin-right:7px" href="/watch?v=${videoData.id}" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
${videoData.title}
</a>
</div>
<div id="playnav-curvideo-info-line">
${localizeString("watch.from", data.info.name)} &nbsp;|
<span dir="ltr">${videoData.views[1]}</span>
&nbsp;|
<span id="playnav-curvideo-view-count">${videoData.views[0]}</span>
</div>
<div class="cb"></div>
<div id="channel-like-result" class="hid">
<div id="watch-actions-area" class="yt-rounded">&nbsp;</div>
</div>
<div id="channel-like-loading" class="hid">${localizeString("global.loading")}</div>
<div class="cb"></div>
<div id="playnav-curvideo-description-container">
<div id="playnav-curvideo-description" dir="ltr">${videoData.description}</div>
</div>
<a href="https://www.youtube.com/watch?v=${videoData.id}" id="playnav-watch-link" onclick="playnav.goToWatchPage()">View comments, related videos, and more</a>
<div id="playnav-curvideo-controls"></div>
<div class="cb"></div>
</div>
<div id="playnav-panel-comments" class="hid"></div>
<div id="playnav-panel-favorite" class="hid"></div>
<div id="playnav-panel-share" class="hid scrollable"></div>
<div id="playnav-panel-playlists" class="hid"></div>
<div id="playnav-panel-flag" class="hid scrollable"></div>
</div>
</div>
</div>
</div>
</div>
<div id="playnav-play-panel" style="margin-top: -400px;height: 0;">
<div id="playnav-play-content" style="height: 601px;">
<div class="playnav-playlist-holder" id="playnav-play-playlist-uploads-holder">
<div id="playnav-play-uploads-scrollbox" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);" class="scrollbox-wrapper inner-box-colors">
<div class="scrollbox-content playnav-playlist-non-all">
<div class="scrollbox-body" style="height: 514px;">
<div class="outer-scrollbox">
<div id="playnav-play-uploads-items" class="inner-scrollbox">
<div id="playnav-play-uploads-page-0" class="scrollbox-page loaded videos-rows-50">
${videos}
<div id="uploads-cb" class="cb"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>`;
                    var OBJ_PLAYNAV = `<div id="user_playlist_navigator" style="background-color: rgb(153, 153, 153); color: rgb(0, 0, 0);position: inherit;" class="outer-box yt-rounded">
<div id="playnav-channel-header" class="inner-box-bg-color" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
<div id="playnav-title-bar">
<div id="playnav-channel-name" style="background-color: rgb(153, 153, 153); color: rgb(0, 0, 0);" class="outer-box-bg-color">
<div class="channel-thumb-holder outer-box-color-as-border-color"><div class="user-thumb-semismall">
<div>
<img src="${data.info.avatar[0].url}">
</div>
</div>
</div>
<div class="channel-title-container">
<div class="channel-title outer-box-color" id="channel_title" dir="ltr">${data.info.name}</div>
<div class="channel-title outer-box-color" style="font-size:11px" id="channel_base_title">${data.info.name}'s ${localizeString("global.channel")}</div>
</div>
<div id="subscribe-buttons">
<span class="subscription-container">
<button type="button" class="subscribe-button yt-uix-button yt-uix-button-urgent yt-uix-tooltip" onclick="document.cosmicCat.func.subscribe();return false;" title="Click to be notified of new videos from this channel" role="button" data-tooltip-text="Click to be notified of new videos from this channel">
<span class="yt-uix-button-content">${data.SUBSCRIBE ? localizeString("buttons.subscribed") : localizeString("buttons.subscribe")}</span>
</button>
<span class="subscription-subscribed-container hid">
<span class="subscription-options-button subscription-expander yt-uix-expander yt-uix-expander-collapsed">
<span class="yt-uix-expander-head yt-rounded">
<button class="yt-uix-expander-arrow" onclick="return false;">
</button>
<span class="yt-alert yt-alert-success yt-alert-small yt-alert-naked yt-rounded">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon" alt="Alert icon">
<span class="yt-alert-content">${localizeString("buttons.subscribed")}</span>
</span>
</span>
</span>
</span>
</span>
</div>
</div>
<div id="playnav-chevron" style="border-left-color: rgb(153, 153, 153);">&nbsp;</div>
</div>
<div id="playnav-navbar">
<table>
<tbody>
<tr>
<td>
<a class="navbar-tab inner-box-link-color navbar-tab-selected" id="playnav-navbar-tab-playlists">Uploads</a>
</td>
</tr>
</tbody>
</table>
</div>
<div class="cb"></div>
</div>
<div id="subscription-button-module-menu" class="hid subscription-menu-expandable subscription-menu">
<div class="subscription-menu-not-logged-in">
<strong>
<a href="${document.cosmicCat.data.loginUrl}">Sign in</a> or <a href="https://www.youtube.com/signup">sign up</a> now!
</strong>
</div>
</div>
${(videos.length > 0) ? OBJ_PLAYNAVA : ""}
</div>`;
                    var OBJ_RECENTACT;
                    var OBJ_LEFTCOLL = `<div class="left-column" id="main-channel-left">
<div class="inner-box" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
<div style="float:left;padding:0 4px 4px 0" class="link-as-border-color">
<div class="user-thumb-xlarge">
<div>
<a href="https://www.youtube.com/channel/${data.info.id}"><img src="${data.info.avatar[0].url}"></a>
</div>
</div>
</div>
<div style="float:left;width:170px">
<div class="box-title title-text-color" title="${data.info.name}" style="float:none;padding-left:4px;margin-top:-2px;width:170px;overflow:hidden;font-size:111%">
<span class="yt-user-name" dir="ltr">${data.info.name}</span>
</div>
<div style="whitespace:no-wrap;position:relative;width:170px;">
<div>
<span class="subscription-container">
<button type="button" class="subscribe-button yt-uix-button yt-uix-button-urgent yt-uix-tooltip" onclick="document.cosmicCat.func.subscribe();return false;" title="Click to be notified of new videos from this channel" role="button">
<span class="yt-uix-button-content">${data.SUBSCRIBE ? localizeString("buttons.subscribed") : localizeString("buttons.subscribe")}</span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</button>
</span>
</div>
</div>
${thelegend}
</div>
<div class="cb"></div>
</div>
${OBJ_USERPROFILE}
${OBJ_SUBS}
</div>`;
                    var OBJ_RIGHTCOLL = `<div class="right-column" id="main-channel-right">
<div class="inner-box" id="user_recent_activity" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
<div style="zoom:1">
<div class="box-title title-text-color">Recent Activity</div>
<div class="cb"></div>
</div>
<div id="user_recent_activity-body">
<div id="feed_table">
<div class="text-field recent-activity-content outer-box-bg-as-border" style="_width:610px">
<table width="97%" cellspacing="0" cellpadding="0" border="0">
<tbody>${recentfeed}</tbody>
</table>
</div>
</div>
</div>
</div>
<div class="clear"></div>
</div>`;
                    var OBJ_CHANCON = `<div class="outer-box" id="main-channel-content" style="z-index: 0;background-color: rgb(153, 153, 153); color: rgb(0, 0, 0);">
${OBJ_LEFTCOLL}${OBJ_RIGHTCOLL}
<div class="cb"></div>
</div>`;
                    return `<div id="channel-body" style="background-color: rgb(204, 204, 204)" class="jsloaded">
<div id="channel-base-div">
${OBJ_PLAYNAV}
${OBJ_CHANCON}
</div>
</div>
<div class="cb">
<div class="clear"></div>
</div>`;
                };
                let channel3 = () => {
                };
                switch (arg) {
                    case 0:
                        return channel1();
                    case 1:
                        return channel2();
                    case 2:
                        return channel3();
                    default:
                        return error("Channels.renderPage: Supply valid number between 0-2");
                }
            },
            Fetch: {
                Videos: async () => {
                    return await fetch(`https://www.youtube.com${window.location.pathname}/videos`).then(a => document.cosmicCat.Utils.convertXHRtoJSON(a.text())).then(res => {
                        if (res.error) throw Error();

                        let tab = document.cosmicCat.Utils.browseTabs.find(res, "videos");
                        let contents = document.cosmicCat.Utils.browseTabs.content(tab)[0]?.gridRenderer?.items;

                        if (!contents) throw Error();

                        let result = [];

                        for (let i = 0; i < contents.length; i++) {
                            if (!contents[i].continuationItemRenderer) {
                                result[i] = document.cosmicCat.func.organizeVideoData(contents[i].gridVideoRenderer);
                            }
                        }

                        return result;
                    }).catch(err => {
                        return [];
                    });
                },
                Info: async () => {
                    return await fetch(`https://www.youtube.com${window.location.pathname}/about`).then(a => document.cosmicCat.Utils.convertXHRtoJSON(a.text())).then(res => {
                        if (res.error) throw Error();

                        let tab = document.cosmicCat.Utils.browseTabs.find(res, "about");
                        let contents = document.cosmicCat.Utils.browseTabs.content(tab)[0].channelAboutFullMetadataRenderer;

                        if (!contents) throw Error();

                        let result = document.cosmicCat.Utils.Sort.channelData(contents);

                        return result;
                    }).catch(err => {
                        return [];
                    });
                },
                Feed: async () => {
                    return await fetch(`https://www.youtube.com${window.location.pathname}/community`).then(a => document.cosmicCat.Utils.convertXHRtoJSON(a.text())).then(res => {
                        if (res.error) throw Error();

                        let tab = document.cosmicCat.Utils.browseTabs.find(res, "community");
                        let contents = document.cosmicCat.Utils.browseTabs.content(tab);

                        if (!contents) throw Error();

                        let result = [];

                        for (let i = 0; i < contents.length; i++) {
                            if (!contents[i].continuationItemRenderer) {
                                result[i] = document.cosmicCat.Utils.Sort.feedData(contents[i]);
                            }
                        }

                        return result;
                    }).catch(err => {
                        return [];
                    });
                }
            }
        },
        Subscriptions: {
            getChannelInfo: async () => {
                let t = await fetch("https://www.youtube.com/feed/channels");
                return document.cosmicCat.Subscriptions.handleData(t.text(), 1);
            },
            getFeedInfo: async () => {
                let t = await fetch("https://www.youtube.com/feed/subscriptions?flow=2");
                return document.cosmicCat.Subscriptions.handleData(t.text());
            },
            handleData: (a, b) => {
                return a.then(n => {
                    let p = JSON.parse(n.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content;
                    return p ? p.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items : [];
                    //then(n => (b == 1) ? n = n[0].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items : []) : [];
                });
            }
        },
        Watch: {
            likeVideo: (ml) => {
                if(BOOL_LOGIN !== true) {
                    if (window.location.pathname.split("/")[1] !== "watch") {
                        document.cosmicCat.toggleElm("#channel-like-logged-out");
                    }
                    return;
                }

                var update = (math) => {
                    if (window.location.pathname.split("/")[1] == "watch") {
                        var equ = parseInt(document.querySelector("span.likes").innerText.replace(/,/g, ""));
                        var equ2 = parseInt(document.querySelector("span.dislikes").innerText.replace(/,/g, ""));
                        switch (math) {
                            case 0:
                                equ -= 1;
                                equ2 += 1;
                                break;
                            case 1:
                                equ += 1;
                                equ2 -= 1;
                                break;
                        }
                        document.querySelector("span.likes").innerText = equ.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        if(document.querySelector("#watch-unlike").classList.contains("unliked")) {
                            document.querySelector("span.dislikes").innerText = equ2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }
                    }
                };
                if(document.querySelector("#watch-like").classList.contains("liked")) {
                    update(0);
                    document.cosmicCat.AJAX.post("/youtubei/v1/like/removelike", `target:{videoId: "${ml}"}`);
                    return document.querySelector("#watch-like").classList.remove("liked");
                }
                update(1);
                document.cosmicCat.AJAX.post("/youtubei/v1/like/like", `target:{videoId: "${ml}"}`);
                document.querySelector("#watch-like").classList.add("liked");
                document.querySelector("#watch-unlike").classList.remove("unliked");
            }
        },
        player: {
            Create: () => {
                const a = document.createElement("script");
                a.innerHTML = `const deez = {config: {
        url: "https://s.ytimg.com/yts/swfbin/player-vfl8Mj1Eu/watch_as3.swf",
        urlV8: "https://s.ytimg.com/yts/swfbin/player-vfl8Mj1Eu/cps.swf",
        urlV9As2: "https://s.ytimg.com/yts/swfbin/player-vfl8Mj1Eu/cps.swf",
        args: {
          author: ytInitialPlayerResponse.videoDetails.author,
          dashmpd: ytInitialPlayerResponse.streamingData.dashManifestUrl,
          focEnabled: "1",
          adaptive_fmts: "",
          account_playback_token: "",
          enablecsi: "0",
          length_seconds: ytInitialPlayerResponse.videoDetails.lengthSeconds,
          ytfocEnabled: "1",
          remarketing_url: "",
          cos: "Windows",
          uid: "",
          iv_invideo_url: "",
          idpj: "0",
          sourceid: "y",
          vid: ytInitialPlayerResponse.videoDetails.videoId,
          watermark:
            ",https://s.ytimg.com/yts/img/watermark/youtube_watermark-vflHX6b6E.png,https://s.ytimg.com/yts/img/watermark/youtube_hd_watermark-vflAzLcD6.png",
          avg_rating: "",
          fexp: "908547,914099,927622,930666,930672,932404,934040,940247,940642,947209,947215,949424,951701,952302,952901,953000,953912,957103,957201,958600",
          host_language: "en",
          iv_load_policy: "1",
          token: "1",
          loaderUrl:
            "https://www.youtube.com/watch?v=" +
            ytInitialPlayerResponse.videoDetails.videoId,
          ptk: "ea",
          baseUrl:
            "https://googleads.g.doubleclick.net/pagead/viewthroughconversion/962985656/",
          cosver: "6.2",
          t: "1",
          oid: "",
          cbrver: yt.config_.INNERTUBE_CONTEXT.client.browserVersion,
          plid: "",
          ptchn: "",
          dash: "1",
          no_get_video_log: "1",
          sdetail: "p:/embed/" + ytInitialPlayerResponse.videoDetails.videoId,
          tmi: "1",
          storyboard_spec: ytInitialPlayerResponse.storyboards.playerStoryboardSpecRenderer.spec,
          vq: "auto",
          atc: "",
          of: "",
          allow_embed: "1",
          url_encoded_fmt_stream_map: "",
          aid: "",
          ucid: ytInitialPlayerResponse.videoDetails.channelId,
          cr: "RO",
          timestamp: "1414688781",
          iv_module:
            "https://s.ytimg.com/yts/swfbin/player-vfl8Mj1Eu/iv_module.swf",
          rmktEnabled: "1",
          probe_url:
            "https://www.youtube.com/embed/" +
            ytInitialPlayerResponse.videoDetails.videoId,
          video_id: ytInitialPlayerResponse.videoDetails.videoId,
          title: ytInitialPlayerResponse.videoDetails.title,
          cl: "78766649",
          eventid: "",
          csi_page_type: "watch,watch7",
          hl: "en_US",
          iv3_module: "1",
          sw: "0.1",
          fmt_list: "22/1280x720/9/0/115,18/640x360/9/0/115,17/256x144/99/1/0",
          cbr: yt.config_.INNERTUBE_CONTEXT.client.browserName,
          ytfocHistoryEnabled: "0",
          referrer:
            "https://www.youtube.com/embed/" +
            ytInitialPlayerResponse.videoDetails.videoId,
          allow_ratings: "1",
          enablejsapi: 0,
          pltype: "content",
          keywords: ytInitialPlayerResponse.videoDetails.title,
          ldpj: "0",
          c: "WEB",
          view_count: ytInitialPlayerResponse.videoDetails.viewCount
        },
        assets: {
          css: "//s.ytimg.com/yts/cssbin/www-player-vfluwFMix.css",
          js: "//ciulinuwu.github.io/lib/html5player.js",
          html: "//cdn.discordapp.com/attachments/996734304560353332/1018500227629592656/html5_player_template.html"
        },
        attrs: {
          id: "movie_player"
        },
        params: {
          allowfullscreen: "true",
          allowscriptaccess: "always",
          bgcolor: "#000000"
        },
        minVersion: "8.0.0",
        fallback: null,
        fallbackMessage: null,
        html5: !0,
        disable: {},
        loaded: !0,
        messages: {
          player_fallback: [
            'Adobe Flash Player or an HTML5 supported browser is required for video playback.<br><a href="https://get.adobe.com/flashplayer/">Get the latest Flash Player </a><br><a href="/html5">Learn more about upgrading to an HTML5 browser</a>'
          ]
        }
      }}`;
                document.body.appendChild(a);
                var n = ``;
                try {
                    for ( let i = 0, j = ytInitialPlayerResponse.streamingData.formats.length; i < j; i++ )
                        (n += "fallback_host=" + ytInitialPlayerResponse.streamingData.formats[i].url.split("://")[1].split(".com")[0] +
                         ".com&type=" +
                         encodeURIComponent(
                            ytInitialPlayerResponse.streamingData.formats[i].mimeType
                        ).replace("%20", "+") +
                         "&url=" +
                         encodeURIComponent(ytInitialPlayerResponse.streamingData.formats[i].url) +
                         "&quality=" +
                         ytInitialPlayerResponse.streamingData.formats[i].quality +
                         "&itag=" +
                         ytInitialPlayerResponse.streamingData.formats[i].itag),
                            i < parseInt(ytInitialPlayerResponse.streamingData.formats.length - 1) &&
                            (n += ",");
                } catch (e) {
                    console.log("cound not craft legacy stream url");
                }
                deez.config.args.url_encoded_fmt_stream_map = n;
                const player = document.createElement("script");
                player.src = "//ciulinuwu.github.io/lib/html5player.js";
                player.id = "loaded";
                document.body.appendChild(player);
                const ass = document.createElement("style");
                ass.id = "cosmic-panda-player";
                ass.innerHTML = `
.ytp-play-progress {
    background-image: linear-gradient(to bottom,#c00 0,#600 100%);
}
.ytp-load-progress {
    background-image: linear-gradient(to top,#5a5a5a 89%,#666 90%);
}
.html5-scrubber-button {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-common-vflzogr__.png) -305px -41px;
    border:none;
    width:17px;
    height:16px!important;
    border-radius:0;
    top:-6px
}
.exp-fixed-masthead.site-left-aligned #yt-masthead-container {
    margin:0
}
.exp-fixed-masthead #page-container, body.exp-fixed-masthead #masthead-expanded {
    margin-top:50px
}
.html5-progress-bar:focus .html5-scrubber-button, .html5-scrubber-button:active, .html5-scrubber-button:hover {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-common-vflzogr__.png) 0 0;
}
.ytp-progress-list {
    background: #1e1f1f;
    background-image: linear-gradient(to top,rgba(30,31,31,.75) 89%,#2f2f2f 90%);
}
.html5-video-player .html5-player-chrome {
    padding-bottom:1px;
    height:26px;
background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAdCAYAAABrAQZpAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAABAAAAHQAh4gKwAAAAMUlEQVQI12OQlJD4x2Sgr8/I9OTZs5dM//79Y2T6//8/IyqLAcLClEBjYahDKCHSKADN5VNQpdTxzgAAAABJRU5ErkJggg==')
}
button.ytp-v3normal.ytp-button {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -96px -151px;
}
button.ytp-v3normal.ytp-button:hover {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -97px
}
#player.watch-small button.ytp-v3normal.ytp-button {
    background:no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -96px -151px, #141414;
    box-shadow: inset 0 -5px 5px #000;
}

#player.watch-medium button.ytp-v3teather.ytp-button, .ytp-size-toggle-large:focus {  /*2nd selector is for new exp*/
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -121px -340px, #141414;
    box-shadow: inset 0 -5px 5px #000;
}
button.ytp-v3teather.ytp-button, .ytp-size-toggle-large {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -121px -340px;
}
button.ytp-v3teather.ytp-button:hover, .ytp-size-toggle-large:hover {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -32px -43px;
}
.ytp-button-fullscreen-enter, .ytp-embed .ytp-fullscreen-button.ytp-button {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -128px -43px;
}
.ytp-button-fullscreen-enter:not(.ytp-disabled):focus, .ytp-button-fullscreen-enter:not(.ytp-disabled):hover {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -89px -340px;
}
.ytp-settings-button {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -89px -70px;
}
.ytp-settings-button:hover, .ytp-settings-button:not(.ytp-disabled):focus {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -35px -259px!important;
}
.ytp-settings-button-active {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -35px -259px, #141414!important;
    box-shadow: inset 0 -5px 5px #000;
}
.ytp-subtitles-button,.ytp-subtitles-button:focus {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -151px;
}
.ytp-subtitles-button:hover {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -57px -340px;
}
.ytp-subtitles-button-active:focus, .ytp-subtitles-button-active:hover, .ytp-subtitles-button-active {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -128px -178px;
}
.ytp-button-watch-later, .ytp-button-watch-later:focus {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -96px -178px;
}
.ytp-button-watch-later:hover, .ytp-button-watch-later:active {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -96px -124px;
}
.ytp-button-volume[data-value=max], .ytp-button-volume[data-value=loud], .ytp-button-volume[data-value=max]:focus, .ytp-button-volume[data-value=loud]:focus, .ytp-embed .ytp-mute-button {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -232px;
}
.ytp-button-volume[data-value=max]:hover, .ytp-button-volume[data-value=loud]:hover {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -178px;
}
.ytp-button-volume[data-value=normal], .ytp-button-volume[data-value=quiet],  .ytp-button-volume[data-value=normal]:focus, .ytp-button-volume[data-value=quiet]:focus {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -32px -178px;
}
.ytp-button-volume[data-value=normal]:hover, .ytp-button-volume[data-value=quiet]:hover {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -92px -259px;
}
.ytp-button-volume[data-value=min], .ytp-button-volume[data-value=min]:focus {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -124px;
}
.ytp-button-volume[data-value=min]:hover {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -124px;
}
.ytp-button-volume[data-value=off], .ytp-button-volume[data-value=off]:focus {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -57px -70px;
}
.ytp-button-volume[data-value=off]:hover {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -3px -259px;
}
.ytp-button-play, .ytp-embed .ytp-play-button {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -32px -151px;
}
.ytp-button-play:not(.ytp-disabled):hover, .ytp-button-play:not(.ytp-disabled):active, .ytp-button-play:not(.ytp-disabled):focus {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -32px -124px!important;
}
.ytp-button-pause, .ytp-button-play:not(.ytp-disabled):focus {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -340px;
}
.ytp-button-pause:not(.ytp-disabled):focus, .ytp-button-pause:not(.ytp-disabled):hover {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -70px;
}
.ytp-button-replay {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -36px -285px;
}
.ytp-button-replay:not(.ytp-disabled):hover {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -36px -312px;
}
.ytp-button-stop {
     background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -90px -97px;
}
.ytp-button-stop:not(.ytp-disabled):hover {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -33px -232px;
}
.ytp-volume-slider-foreground:before {
    background:linear-gradient(#290909,#BD2020,#B31E1E,#A71C1C,#901A1A,#6F1313,#444444);
    height:7px;
    top:4px
}
.ytp-volume-slider-foreground:after {
    background:linear-gradient(#050404,#050404,#050404,#050404,#050404,#050404,#444);
    height:7px;
    top:4px
}
.ytp-volume-slider-foreground {
    background:linear-gradient(#fff,#CFCFCF);
    border-radius:3px
}
.ytp-button-play, .ytp-volume-control, .ytp-subtitles-button,.ytp-subtitles-button-active, .ytp-settings-button, .ytp-settings-button-active {
        border-right: 1px solid #222;
}
#yt-masthead-user-displayname {
    display:none
}
.gssb_c:hover {
    display:table!important;
}
.gssb_c .gsq_a:hover {
    cursor:text!important
}
.gssb_c .gsq_a tr:hover {
    background:#eee
}

.comment-actions a {
        display:none
}
.comment-actions {
    color:transparent!important
}
.comment-actions .separator, .comment-actions button.start, #comments-view .comment .time a{
    color:#999!important
}
.comment-actions .comments-rating-positive, #comments-view .comment .yt-uix-button {
    color:#2793e6
}
.yt-lockup-meta-info li:first-child {
    width:100%
}
.home.clearfix.masthead-ad-expanded {
    max-width:1600px!important
}
.home .yt-thumb-175,.home .feeds-mode .yt-shelf-grid-item, .home .multirow-shelf .yt-shelf-grid-item {
    width:182px
}
.yt-ui-ellipsis {
    text-overflow:clip
}

.ytp-embed svg {
    visibility:hidden}
.ytp-embed button.ytp-fullscreen-button.ytp-button {
    width:0!Important;
    top:-10px
}
.ytp-embed div.ytp-gradient-top,.ytp-embed .ytp-chrome-top  {
    display:none
}
.ytp-menuitem {
    max-height:26px;
    height:26px
}
.ytp-chrome-controls .ytp-button.ytp-youtube-button, .ytp-small-mode .ytp-chrome-controls .ytp-button.ytp-youtube-button, .ytp-exp-bigger-button-like-mobile.ytp-small-mode .ytp-chrome-controls .ytp-button.ytp-youtube-button {
    display:none
}
.ytp-embed .ytp-chrome-controls {
    max-height:28px!important
}
.ytp-embed .ytp-progress-bar-container {
    bottom:32px
}
.ytp-exp-bottom-control-flexbox .ytp-left-controls, :not(.ytp-exp-bottom-control-flexbox) .ytp-right-controls {
    margin-top:5px
}
.ytp-embed .ytp-time-display {
    height:26px;
    line-height:26px
}
#guide-container .guide-item.guide-item-selected, #guide-container .guide-collection-item .guide-item.guide-item-selected, #guide-container .guide-item.guide-item-selected:hover {
    background-image: linear-gradient(to bottom,#af2b26 0,#942422 100%);
}
.guide-flyout-trigger.on-hover, #guide-container .guide-item:hover, #guide-container .guide-collection-item:hover .guide-item {
    background-image: linear-gradient(to bottom,#444 0,#333 100%);
}
.gstl_50.gssb_c {
    z-index:9999;
    position:fixed!important
}
.site-left-aligned #yt-masthead-container {
        width: 100%!important;
    position: fixed;
    z-index: 999;
    top:0
}
#page-container, body #masthead-expanded {
    margin-top:50px
}
body #masthead-expanded {
    margin-bottom:-50px
}
#upload-button-menu, .sb-card {
    position:fixed;
}
html #player.watch-small .html5-video-player:not(.ideal-aspect) .html5-main-video {
    max-width:initial!important;
    max-height:initial!important
}
#error-page-content #yt-masthead {
    margin:25px 128px!important
}
.profile-view-module .section.created-by-section div.user-profile-item, #yt-masthead #logo-container span.content-region {
    display:none
}
.guide-channels-list, .site-left-aligned .guide-channels-list {
    max-height:none
}
.video-list-item a:visited .title {
    color:#429!important
}
.video-extras-sparkbar-likes {
    width:100%;
}
/*settings*/
.ytp-menu-content {
    border-spacing:1px
}
.ytp-menu {
    background:#141414;
    border-radius:3px 3px 0 0;
    padding:0
}
.ytp-drop-down-menu {
    display:inline-block!important;
    position:relative;
    background:none;
    border:none;
}
.ytp-drop-down-menu-button {
    color:#aaa;
    padding:4px 7px
}
.ytp-drop-down-menu-button-selected {
    color:#fff;
}
.ytp-drop-down-menu-button-checked .ytp-drop-down-menu-button-check, .ytp-drop-down-menu-button-checked:hover:not(.ytp-disabled) .ytp-drop-down-menu-button-check {
    background:none #fff;
    border-radius:50%;
    height:3px;
    width:3px;
    margin:0 11px 1px -1px
}
.ytp-drop-down-menu-button-check {
    height:3px;
    width:3px;
    margin:0 11px 1px -1px
}
.ytp-drop-down-menu-button:hover:not(.ytp-disabled) {
    background:#601212
}
.ytp-menu-row {
    display:inline-block;
    vertical-align:top;
    box-shadow: 1px 0 0 0 #2b2b2b inset;
    border-left: 1px solid #000;
    padding:0 3px;
    min-height:135px
}
.ytp-menu-row:first-child {
    border-left:transparent;
    box-shadow:none
}
.ytp-menu-cell {
    display:block
}
.ytp-drop-down-label {
    display:none
}
.ytp-menu-title {
    text-align:left;
    padding:4px 7px 4px 16px
}
.ytp-drop-down {
    min-width:0!important
}
.ytp-segmented-control {
    margin-left:16px
}`;
                document.querySelector("head").append(ass);
                player.addEventListener("load", (elm) => {
                    yt.player.Application.create("player-api", deez.config);

                    let a = document.querySelector("#movie_player");
                    document.querySelector("#watch-player").append(a);
                    document.querySelector("#player.skeleton.flexy").remove();

                    $(document).on('click', '.ytp-size-toggle-large, .ytp-size-button.toggled', function(e) {
                        if (e.target.classList.contains("ytp-size-button")) e.target.classList.remove("toggled");
                        document.querySelector('#watch-container').classList.remove("watch-wide");
                        document.querySelector('#watch-video').classList.add('small');
                        document.querySelector('#watch-video').classList.remove('medium');
                        setTimeout(function () {if (document.querySelector('.watch-playlist-collapsed')) document.querySelector('#player').classList.remove('watch-playlist-collapsed');}, 1);
                    });
                    $(document).on('click', '.ytp-size-toggle-small, .ytp-size-button:not(.toggled)', function(e) {
                        if (e.target.classList.contains("ytp-size-button")) e.target.classList.add("toggled");
                        if (document.querySelector('.watch-playlist')) document.querySelector('#player').classList.add('watch-playlist-collapsed');
                        document.querySelector('#watch-container').classList.add("watch-wide");
                        setTimeout(function () {
                            document.querySelector('#watch-video').classList.remove('small');
                            document.querySelector('#watch-video').classList.add('medium');
                        }, 300);
                    });
                });
            },
            play: (dom) => {
                switch (dom.dataset.state) {
                    case "0":
                        document.cosmicCat.player._dom.play();
                        dom.dataset.state = 1;
                        break;
                    case "1":
                        document.cosmicCat.player._dom.pause();
                        dom.dataset.state = 0;
                        break;
                }
            },
            mute: (state) => {
                let seek = 0;
                let data = 0;
                switch (state) {
                    case "0":
                        seek = 100;
                        data = 3;
                        document.querySelector("#video-player").querySelector(".playbar-volume_container").setAttribute("data-tooltip", localizeString("player.mute"));
                        document.cosmicCat.player.unMute();
                        break;
                    default:
                        document.querySelector("#video-player").querySelector(".playbar-volume_container").setAttribute("data-tooltip", localizeString("player.unmute"));
                        document.cosmicCat.player.mute();
                        break;
                }
                document.querySelector(".playbar-volume-slider").setAttribute("aria-valuenow", seek);
                document.querySelector("#video-player").querySelector(".playbar-controls_volume").setAttribute("data-state", data);
            }
        },
        picker: {
            set: function (type, param) {
                if (!type || !param) return Error("picker.set", "Arguments must be supplied.");
                console.debug("picker.set", type);
                document.cosmicCat.Storage.add(type, param);
                if (type == "lang") {
                    Ciulinations().setTranslation(param);
                }
            }
        },
        Storage: {
            init: function () {
                const STORAGE = localStorage.getItem("ciulinfig");
                console.debug("Storage.init", STORAGE);

                if(!STORAGE) return this.build();

                console.info("Storage.init", "storage has init.");
            },
            build: function() {
                const obj = {
                    "storageVer": document.cosmicCat.data.version,
                    "lang": "en",
                    "i18n": {},
                    "i18n.setup": "0"
                };
                localStorage.setItem("ciulinfig", JSON.stringify(obj));
            },
            get: function (a) {
                const STORAGE = JSON.parse(localStorage.getItem("ciulinfig")); //GM.getValue(a)

                return {
                    name: a,
                    exists: !!STORAGE[a],
                    value: STORAGE[a]
                };
            },
            add: function (a, b) {
                let obj = JSON.parse(localStorage.getItem("ciulinfig"));
                obj[a] = b;
                console.debug("Storage.add", obj[a]);
                localStorage.setItem("ciulinfig", JSON.stringify(obj));
            }
        }
    };

    function Ciulinations()
    {
        const obj = {
            setTranslation: function (params) {
                return fetch(document.cosmicCat.data.i18nfolder + `${params}.json`)
                    .then((response) => response.json())
                    .then((data) => {
                    document.cosmicCat.Storage.add("i18n", data);
                    window.location.reload();
                    return true;
                })
                    .catch((error) => {
                    alert(params + " is not translated yet.\n\nContribute: https://github.com/ciulinuwu/ciulinations");
                    console.error(error, "reverting to fallback.");
                    return false;
                    //document.cosmicCat.func.addToStorage("i18n", this.useFallback());
                });
            },
            useFallback: function() {
                //return document.cosmicCat.func.getFromStorage("i18n.fallback");
            },
            getTranslation: function () {
                return document.cosmicCat.Storage.get("i18n").value;
            }
        };
        const STORAGE = document.cosmicCat.Storage.get("i18n.setup");
        if(STORAGE.value !== "1") {
            obj.setTranslation("en");
            document.cosmicCat.Storage.add("i18n.setup", "1");
        }

        return obj;
    }

    const localizeString = (varr, DOM) => {
        const lang = Ciulinations().getTranslation();
        let args = varr.split(".");
        let i18n = lang.json?.[args[0]]?.[args[1]];

        switch (varr) {
            case "watch.uploaderinfo":
                i18n = i18n.replace(/%s/g, `<a href="https://www.youtube.com${DOM?.url}" class="yt-uix-sessionlink yt-user-name author" rel="author" dir="ltr">${DOM?.owner}</a>`);
                i18n = i18n.replace(/%r/g, `<span id="eow-date" class="watch-video-date">${DOM?.upload}</span>`);
                break;
            case "watch.uploadedavideo":
                i18n = i18n.replace(/%s/g, `<span class="feed-item-owner"><a href="${DOM?.url}" class="yt-uix-sessionlink yt-user-name" dir="ltr">${DOM?.owner.text}</a></span>`);
                break;
            case "watch.from":
                i18n = i18n.replace(/%s/g, `<span id="playnav-curvideo-channel-name"><a href="${window.location.href}">${DOM}</a></span>`);
                break;
            case "watch.islive":
                i18n = i18n.replace(/%s/g, `<span class="feed-item-owner"><a href="${DOM?.url}" class="yt-uix-sessionlink yt-user-name" dir="ltr">${DOM?.owner.text}</a></span>`);
                break;
            case "watch.by":
                i18n = (window.location.pathname.split("/")[1] == "results") ? i18n.replace(/%s/g, `<a href="https://www.youtube.com${DOM?.url}" class="yt-uix-sessionlink yt-user-name" dir="ltr">${DOM?.owner.text}</a>`) : i18n.replace(/%s/g, `<span class="yt-user-name" dir="ltr">${DOM?.owner.text}</span>`);
                break;
            case "stats.likesdislikes":
                i18n = i18n.replace(/%s/g, `<span class="likes"></span>`);
                i18n = i18n.replace(/%r/g, `<span class="dislikes"></span>`);
                break;
            case "channels.about":
                i18n = i18n.replace(/%s/g, `${DOM?.owner}`);
                break;
            case "comments.charactersremain":
                i18n = i18n.replace(/%s/g, `<span class="comments-remaining-count" data-max-count="500">500</span>`);
                break;
        }

        return i18n;
    };

    if(window.location.pathname.split("/")[1] == "embed"){
        document.cosmicCat.func.waitForElm(".ytp-show-cards-title").then((elm) => {elm.parentNode.removeChild(elm);});
        document.cosmicCat.func.waitForElm(".ytp-watermark").then((elm) => {elm.parentNode.removeChild(elm);});
        document.cosmicCat.func.waitForElm(".html5-endscreen").then((elm) => {elm.parentNode.removeChild(elm);});
        document.cosmicCat.func.waitForElm(".ytp-pause-overlay").then((elm) => {elm.parentNode.removeChild(elm);});
        document.cosmicCat.func.waitForElm(".ytp-gradient-top").then((elm) => {elm.parentNode.removeChild(elm);});
        return;
    }
    document.cosmicCat.Storage.init();

    document.addEventListener("beforescriptexecute", (e) => {
        let t = e.target;
        (t.src.search("base.js") > -1 ||
         t.src.search("desktop_polymer.js") > -1 ||
         t.src.search("network.vflset") > -1 ||
         t.src.search("spf") > -1) &&
            (e.preventDefault(), t.remove());
    });

    document.cosmicCat.func.waitForElm("ytd-app").then((e) => {
        e.remove();
        document.querySelector("body").setAttribute("ytdataloaded", "");

        var t = document.createElement("head");
        t.setAttribute("litterbox", "");
        document.querySelector("html").prepend(t);
        document.querySelector("html head:not([litterbox])").remove();

        var y = document.createElement("script");
        y.setAttribute("id", "www-searchbox");
        y.setAttribute("src", "//s.ytimg.com/yts/jsbin/www-searchbox-vflOEotgN.js");
        document.querySelector("head").append(y);

        var o = document.createElement("title");
        o.innerText = "YouTube - Broadcast Yourself.";
        document.querySelector("head").append(o);

        var x = document.createElement("link");
        x.setAttribute("rel", "icon");
        x.setAttribute("href", "//s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico");
        document.querySelector("head").append(x);

        var u = document.createElement("link");
        u.setAttribute("rel", "shortcut icon");
        u.setAttribute("href", "//s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico");
        document.querySelector("head").append(u);

        var style = document.createElement("link");
        style.href = "//s.ytimg.com/yts/cssbin/www-player-vfluwFMix.css";
        style.rel = "stylesheet";
        document.head.appendChild(style);

        var n = document.createElement("link");
        n.setAttribute("id", "www-yt-core");
        n.setAttribute("rel", "stylesheet");
        n.setAttribute("href", "//s.ytimg.com/yts/cssbin/www-core-vfleLhVpH.css");
        document.querySelector("head").append(n);

        setTimeout(function () {
            document.querySelector("body").setAttribute("ythtmlloaded", "");
        }, 1);
    });

    await document.cosmicCat.Account.fetch();

    var SUPERDOM = document.createElement("div");
    var SUPERDUM = document.createElement("div");
    SUPERDUM.setAttribute("id", "body-container");
    SUPERDOM.setAttribute("id", "page");
    //DOMBODY.setAttribute("class", `date-${VALUE_DATE} ${VALUE_LANG.value} ltr ytg-old-clearfix guide-feed-v2 gecko gecko-16`);
    //DOMBODY.setAttribute("dir", "ltr");
    //DOMHTML.appendChild(DOMBODY);

    var STYLE_DARK = `<style>
        * {--dark-noise: url(${document.cosmicCat.data.darkNoiseBg}); --shadow-color: #110f0f; --nero-color-primary: #201e1e; --nero-color-secondary: #242323; --gray-color: #a2a2a2; --silver-color: #bfbfbf; --night-rider-color: #2f2f2f; --white-color: #fff; --black-color: #000;}
        body, #masthead-container {background: var(--dark-noise) !important}
        #masthead-search-terms input {background: var(--black-color) !important; color: var(--white-color);}
        #feed, #feed-background { background: var(--nero-color-primary) !important;}
        .feed-item-container:hover {background: var(--nero-color-secondary) !important;}
        #masthead-nav a, #masthead-user a, .metadata .view-count, .metadata .view-count, .feed-item-actions-line, .heading .header-container, .browse-item-content h3 a {color: var(--silver-color) !important;}
        .feed-item-container .feed-item-main, .feed-item-container:hover {border-bottom: 1px solid var(--night-rider-color) !important;}
        .feed-item-container:hover {border-top: 1px solid var(--night-rider-color) !important;}
        #footer ul {text-shadow: none;}
        #masthead-user-expander .yt-uix-expander-head, #masthead-gaia-user-wrapper, #masthead-gaia-photo-wrapper {border: 1px solid transparent;}
        #eow-title, .watch-view-count, #watch-uploader-info, .title, .yt-uix-button-content {color: var(--silver-color) !important;}
        #watch-description .expand, #watch-description .collapse {filter: invert();}
        #search-btn .yt-uix-button-content {filter: invert(); color: var(--gray-color);}
        #masthead-expanded-container {box-shadow: inset 0 5px 5px var(--shadow-color);}
        img#logo {background: url(${document.cosmicCat.data.darkyoutubelogo}) !important; background-size: 100px !important;}
        p {color: var(--white-color);}
        #masthead-expanded-loading-message {color: var(--white-color) !important;}
        #masthead-search-terms, #search-btn {border-color: #262626 !important; background: none !important;}
        #search-header h2, .yt-lockup-content * {color: var(--white-color) !important;}
        .yt-uix-button-default, .yt-uix-button-subscription, .yt-uix-button-panel:hover .yt-uix-button-text, body .yt-uix-button-default[disabled] {box-shadow: none !important; text-shadow: 0 1px 0 #000; border-color: #262626; background-image: linear-gradient(to bottom,#000 0,#202020 100%) !important;}
        </style>`;
    //DOMHEAD.innerHTML += STYLE_DARK;

    let OBJ_MASTH = "";
    let OBJ_USER = "";
    if(BOOL_LOGIN === true) {
        OBJ_MASTH = `<div id="masthead-expanded" class="hid">
<div id="masthead-expanded-container" class="with-sandbar">
<div id="masthead-expanded-menus-container">
<span id="masthead-expanded-menu-shade"></span>
<div id="masthead-expanded-google-menu">
<span class="masthead-expanded-menu-header">${localizeString("personal.googleaccount")}</span>
<div id="masthead-expanded-menu-google-container">
<img id="masthead-expanded-menu-gaia-photo" alt="" src="${document.cosmicCat.data.pfp}">
<div id="masthead-expanded-menu-account-info">
<p>${document.cosmicCat.data.name}</p>
<p id="masthead-expanded-menu-email">${document.cosmicCat.data.email}</p>
</div>
<div id="masthead-expanded-menu-google-column1">
<ul>
<li class="masthead-expanded-menu-item"><a href="https://profiles.google.com?authuser=0">${localizeString("personal.profile")}</a></li>
<li class="masthead-expanded-menu-item"><a href="https://plus.google.com/u/0/stream">Google+</a></li>
<li class="masthead-expanded-menu-item"><a href="https://plus.google.com/u/0/settings/privacy">${localizeString("personal.privacy")}</a></li>
</ul>
</div>
<div id="masthead-expanded-menu-google-column2">
<ul>
<li class="masthead-expanded-menu-item">
<a href="https://plus.google.com/u/0/settings">${localizeString("personal.settings")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a class="end" href="/logout">${localizeString("personal.signout")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/channel_switcher" onclick="yt.www.masthead.accountswitch.toggle(); return false;">${localizeString("personal.switchaccount")}</a>
</li>
</ul>
</div>
</div>
</div>
<div id="masthead-expanded-menu">
<span class="masthead-expanded-menu-header">YouTube</span>
<ul id="masthead-expanded-menu-list">
<li class="masthead-expanded-menu-item">
<a href="/profile?feature=mhee">${localizeString("personal.mychannel")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/my_videos?feature=mhee">${localizeString("personal.videomanager")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/?c=subscriptions" onclick="document.cosmicCat.load.home_category(document.querySelector('[data-feed-name=subscriptions]')); return false;">${localizeString("personal.subscriptions")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/account?feature=mhee">${localizeString("personal.youtubesettings")}</a>
</li>
</ul>
</div>
</div>
<div id="masthead-expanded-sandbar">
<div id="masthead-expanded-lists-container">
<div id="masthead-expanded-loading-message">${localizeString("global.loading")}</div>
</div>
</div>
<div class="clear"></div>
</div>
</div>`;
        OBJ_USER = `<span id="masthead-gaia-user-expander" class="masthead-user-menu-expander masthead-expander" onclick="document.cosmicCat.func.toggleExpandedMasthead()">
<span id="masthead-gaia-user-wrapper" class="yt-rounded" tabindex="0">${document.cosmicCat.data.name}</span></span>
<span id="masthead-gaia-photo-expander" class="masthead-user-menu-expander masthead-expander" onclick="document.cosmicCat.func.toggleExpandedMasthead()">
<span id="masthead-gaia-photo-wrapper" class="yt-rounded">
<span id="masthead-gaia-user-image">
<span class="clip">
<span class="clip-center">
<img src="${document.cosmicCat.data.pfp}" alt="">
<span class="vertical-center"></span>
</span>
</span>
</span>
<span class="masthead-expander-arrow"></span>
</span>
</span>`;
    } else {
        OBJ_USER = `<div id="masthead-user-display">
<span id="masthead-user-wrapper">
<button href="${document.cosmicCat.data.loginUrl}" type="button" id="masthead-user-button" onclick=";window.location.href=this.getAttribute('href');return false;" class="yt-uix-button yt-uix-button-text" role="button">
<span class="yt-uix-button-content">
<span id="masthead-user-image">
<span class="clip">
<span class="clip-center">
<img src="//s.ytimg.com/yts/img/silhouette48-vflLdu7sh.png" alt="">
<span class="vertical-center"></span>
</span>
</span>
</span>
<span class="masthead-user-username">${localizeString("buttons.signin")}</span>
</span>
</button>
</span>
</div>`;
    }
    var OBJ_MASTHEAD;
    var OBJ_FOOTER;
    var OBJ_CHANNEL = "";

    document.cosmicCat.data.country = document.cosmicCat.func.parseCoun(yt.config_.GL);

    if(window.location.pathname == "/") {
        let u = document.createElement("link");
        u.setAttribute("id", "www-guide");
        u.setAttribute("rel", "stylesheet");
        u.setAttribute("href", "//s.ytimg.com/yts/cssbin/www-guide-vfljovH6N.css");
        document.querySelector("head").append(u);

        let guidebuilder = "";
        let subsbuilder = "";
        let c = "";
        if(BOOL_LOGIN === true) {
            let subsarr = await document.cosmicCat.Subscriptions.getChannelInfo();
            let mhtml = ``;
            for (let i = 0; i < subsarr.length; i++) {
                let html = `<li class="guide-item-container">
<a class="guide-item" data-feed-name="${subsarr[i].channelRenderer.title.simpleText}" href="/channel/${subsarr[i].channelRenderer.channelId}">
<span class="thumb">
<img class="system-icon" src="${subsarr[i].channelRenderer.thumbnail.thumbnails[0].url}" alt="">
</span><span class="display-name">${subsarr[i].channelRenderer.title.simpleText}</span>
</a>
</li>`;
                mhtml += html;
            }
            subsbuilder = `<div class="guide">
<div id="channel">
<span id="channel-thumb">
<a href="/profile" class="yt-user-photo">
<span class="video-thumb ux-thumb yt-thumb-square-77">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${document.cosmicCat.data.pfp}" alt="${document.cosmicCat.data.name}" width="77"><span class="vertical-align"></span>
</span>
</span>
</span>
</a>
</span>
<div id="personal-feeds">
<ul>
<li class="guide-item-container">
<a class="guide-item guide-item-action" href="/profile?feature=guide">${localizeString("personal.mychannel")}<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="see-more-arrow" alt=""></a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="uploads" data-feed-type="personal" title="Videos you have uploaded">${localizeString("personal.videos")}</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="likes" data-feed-type="personal" title="Videos you have liked">${localizeString("personal.likes")}</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="history" data-feed-type="personal" title="Videos you have watched">${localizeString("personal.history")}</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="watch_later" data-feed-type="personal" title="Videos you have added to your Watch Later list">${localizeString("personal.watchlater")}</a>
</li>
</ul>
</div>
</div>
<div class="guide-section yt-uix-expander first">
<h3 class="guide-item-container selected-child">
<a class="guide-item" data-feed-name="subscriptions" data-feed-url="/feed/subscriptions?flow=2" data-feed-display="Subscriptions" data-feed-icon="subscriptions" onclick="document.cosmicCat.load.home_category(this)">
<span class="thumb">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="system-icon category">
</span><span class="display-name">${localizeString("personal.subscriptions")}</span>
</a>
</h3>
<ul>
${mhtml}
</ul>
</div>
</div>`;
                guidebuilder = `<div id="guide-builder-promo">
<div id="guide-builder-promo-buttons">
<button type="button" class="yt-uix-button yt-uix-button-primary">
<span class="thumb">
<img class="yt-uix-button-icon-add" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="yt-uix-button-content">${localizeString("global.browsechannels")}</span>
</button>
</div>
</div>`;
            } else {
                guidebuilder = `<div id="guide-builder-promo">
<h2>Sign in to customize your homepage</h2>
<div id="guide-builder-promo-buttons" class="signed-out">
<button href="${document.cosmicCat.data.loginUrl}" type="button" class="yt-uix-button yt-uix-button-dark" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
<span class="yt-uix-button-content">Sign In </span>
</button>
<button href="/signup?next=%2Fchannels%3Ffeature%3Dsignup" type="button" class="yt-uix-button yt-uix-button-primary" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
<span class="yt-uix-button-content">Create Account </span>
</button>
</div>
</div>`;
            }

        document.cosmicCat.func.waitForElm("#page").then(async elm => {
            let categories = ["technoblade", "trending", "popular", "music", "live", "gadgets", "news", "sports", "education", "howto"];
            for (let i = 0; i < categories.length; i++) {
                let caties = await document.cosmicCat.load.homepage_list(categories[i]);
                let html = `<li class="guide-item-container">
<a class="guide-item" data-feed-name="${caties.class}" data-feed-url="${caties.url}" onclick="document.cosmicCat.load.home_category(this)">
<span class="thumb">
<img class="system-icon system ${caties.class}" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="display-name">${caties.name}</span>
</a>
</li>`;
                c += html;
            }
            document.querySelector(".cockie").innerHTML = c;
        });

        document.cosmicCat.func.waitForElm("#page").then(async () => {
            let w;
            if(window.location.search == "?c=subscriptions") {
                w = document.querySelector("[data-feed-name='subscriptions']");
            } else
                w = document.querySelector("[data-feed-name='youtube']");
            document.cosmicCat.load.home_category(w);
        });

        OBJ_CHANNEL = `<div id="content">
<div class="guide-layout-container enable-fancy-subscribe-button">
<div class="guide-container">
${guidebuilder}
<div class="guide">
${subsbuilder}
<div class="guide-section yt-uix-expander">
<h3 class="guide-item-container selected-child">
<a class="guide-item selected" data-feed-name="youtube" data-feed-url="" onclick="document.cosmicCat.load.home_category(this)">
<span class="thumb">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="system-icon category">
</span><span class="display-name">${localizeString("guide.fromyt")}</span>
</a>
</h3>
<ul class="cockie">
${c}
</ul>
</div>
</div>
</div>
<div class="guide-background"></div>
<div id="feed" style="width: 790px;">
<div id="feed-main-youtube" class="individual-feed">
<div class="feed-header no-metadata before-feed-content">
<div class="feed-header-thumb">
<img class="feed-header-icon youtube" alt="" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</div>
<div class="feed-header-details">
<h2 class="feed-header-info">${localizeString("guide.fromyt")}</h2>
</div>
</div>
<div class="feed-container">
<div class="feed-page">
<ul class="context-data-container">
</ul>
</div>
</div>
</div>
<div id="feed-error" class="individual-feed hid">
<p class="feed-message">We were unable to complete the request, please try again later.</p>
</div>
<div id="feed-loading-template" class="hid">
<div class="feed-message">
<p class="loading-spinner">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
${localizeString("global.loading")}
</p>
</div>
</div>
</div>
<div id="feed-background" style="width: 790px;"></div>
</div>
</div>`;
    }
    if(window.location.pathname.split("/")[1].match(/watch/i)) {
        const {title, views, upload} = document.cosmicCat.func.organizeVideoData(ytInitialData.contents.twoColumnWatchNextResults.results?.results?.contents[0]?.videoPrimaryInfoRenderer);
        const {owner, description} = document.cosmicCat.func.organizeVideoData(ytInitialData.contents.twoColumnWatchNextResults.results?.results?.contents[1]?.videoSecondaryInfoRenderer);
        let videoData = document.cosmicCat.func.organizeVideoData(ytInitialPlayerResponse);
        BOOL_SUBSCRIBE = document.cosmicCat.func.getSubscription();
        var VALUE_SUGGVIDLOG = (BOOL_LOGIN == true) ? "addto-watch-later-button": "addto-watch-later-button-sign-in";
        var VALUE_VIDEOTAGS = "";
        var OBJ_SUGGESTEDVIDEO = [];
        if (ytInitialData.contents.twoColumnWatchNextResults.secondaryResults) {
            OBJ_SUGGESTEDVIDEO = ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer ? ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents : ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results;
        }
        var OBJ_SUGGESTEDVIDEOS = "";
        var VALUE_SUGGESTEDTOKEN = "";
        var VALUE_SUBBUTTON = document.cosmicCat.func.getSubscription() ? "subscribed" : "subscribe";
        var isLiked = ytInitialData.contents.twoColumnWatchNextResults.results?.contents?.twoColumnWatchNextResults?.results?.results?.contents?.find(a => a.videoPrimaryInfoRenderer).videoPrimaryInfoRenderer?.videoActions?.menuRenderer?.topLevelButtons[0]?.toggleButtonRenderer?.isToggled ? "liked" : "";
        var isDisliked = ytInitialData.contents.twoColumnWatchNextResults.results?.contents?.twoColumnWatchNextResults?.results?.results?.contents?.find(a => a.videoPrimaryInfoRenderer).videoPrimaryInfoRenderer?.videoActions?.menuRenderer?.topLevelButtons[1]?.toggleButtonRenderer?.isToggled ? "unliked" : "";
        for (let i = 0; i < videoData.tags.length; i++) {
            VALUE_VIDEOTAGS += `<li><a href="https://www.youtube.com/results?search_query=${videoData.tags[i]}&amp;search=tag">${videoData.tags[i]}</a></li>`;
        }
        for (let i = 0; i < OBJ_SUGGESTEDVIDEO.length; i++) {
            if(OBJ_SUGGESTEDVIDEO[i].compactVideoRenderer) {
                let videoData = document.cosmicCat.func.organizeVideoData(OBJ_SUGGESTEDVIDEO[i].compactVideoRenderer);
                OBJ_SUGGESTEDVIDEOS += `<li class="video-list-item">
<a href="https://www.youtube.com/watch?v=${videoData.id}" class="related-video yt-uix-contextlink yt-uix-sessionlink">
<span class="ux-thumb-wrap contains-addto">
<span class="video-thumb ux-thumb yt-thumb-default-120">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="//i1.ytimg.com/vi/${videoData.id}/default.jpg" alt="Thumbnail"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${videoData.time}</span>
<button type="button" class="addto-button video-actions spf-nolink ${VALUE_SUGGVIDLOG} yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" onclick=";return false;" role="button">
<span class="yt-uix-button-content">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="${localizeString("personal.watchlater")}">
</span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</button>
</span>
<span dir="ltr" class="title" title="${videoData.title}">${videoData.title}</span>
<span class="stat attribution">${localizeString("watch.by", videoData)}</span>
<span class="stat view-count">${videoData.views[0]}</span>
</a>
</li>`;
            }
            if(OBJ_SUGGESTEDVIDEO[i].continuationItemRenderer) {
                VALUE_SUGGESTEDTOKEN = OBJ_SUGGESTEDVIDEO[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token;
            }
        }
        document.cosmicCat.func.waitForElm("#player").then((elm) => {
            document.cosmicCat.player.Create(videoData.id, window.location.href.split("t=")[1] ? window.location.href.split("t=")[1].split("s")[0] : 1);

            fetch("https://returnyoutubedislikeapi.com/Votes?videoId=" + videoData.id)
                .then((response) => response.json())
                .then((result) => {
                var likes = result.likes;
                var dislikes = result.dislikes;
                var rating = likes + dislikes > 0 ? (likes / (likes + dislikes)) * 100 : 50;
                document.querySelector(".video-extras-sparkbar-likes").style.width = rating + "%";
                document.querySelector(".likes").innerText = likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                document.querySelector(".dislikes").innerText = dislikes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }).catch((err) => {
                console.error("[ReturnYouTubeDislikes] Something went wrong with fetching api:", err);
            });
        });
        document.cosmicCat.func.waitForElm(".comments-post").then(() => {
            document.querySelector(".comments-post").addEventListener("submit", async (e) => {
                e.preventDefault();

                let comm = document.querySelector(".comments-textarea").value;
                if(comm.length < 1) return;

                let api = await document.cosmicCat.AJAX.post("/youtubei/v1/comment/create_comment", `createCommentParams: "${document.querySelector("input#session").value}", commentText: "${comm}"`);
                if(api.actionResult.status == "STATUS_SUCCEEDED") {
                    let re = api.actions[0].runAttestationCommand.ids;

                    let comments = document.querySelector("ul.comment-list.all");
                    let comment = document.createElement("li");
                    comment.setAttribute("class", "comment yt-tile-default");
                    comment.setAttribute("data-author-id", re[2].externalChannelId);
                    comment.setAttribute("data-id", re[0].commentId);
                    comment.setAttribute("data-score", "-1");

                    let json = {cum: "a", authorText: {simpleText: document.cosmicCat.data.name}, commentId: re[0].commentId, contentText: {runs: [{text: comm}]}, publishedTimeText: {runs: [{text: "Just now"}]}, authorEndpoint: {browseEndpoint: {canonicalBaseUrl: document.cosmicCat.data.link}}};
                    let newc = document.cosmicCat.Comments.organizeData(json);

                    comment.innerHTML = newc;
                    comments.insertBefore(comment, comments.children[0]);

                    document.cosmicCat.Comments.Form.uninit();

                    await document.cosmicCat.AJAX.post("/youtubei/v1/att/get", `engagementType: "ENGAGEMENT_TYPE_COMMENT_POST", ids: ${JSON.stringify(re)}`);
                }
                return false;
            });
        });
        document.cosmicCat.func.waitForElm(".comment-list").then(async (elm) => {
            if (ytInitialData.contents.twoColumnWatchNextResults.results?.results?.contents?.filter(b => b.itemSectionRenderer)[1]) {
                document.cosmicCat.toggleElm("#comments-view");
                let con = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.filter(b => b.itemSectionRenderer)[1].itemSectionRenderer.contents[0].continuationItemRenderer.continuationEndpoint.continuationCommand.token;
                let comments = await document.cosmicCat.Comments.init(con);
            }
        });

        OBJ_CHANNEL = `<div id="content" class="">
<div id="watch-container" itemscope="" itemtype="https://schema.org/VideoObject">
<link itemprop="url" href="http://www.youtube.com/watch?v=${videoData.id}">
    <meta itemprop="name" content="${videoData.title}">
    <meta itemprop="description" content="${videoData.description}">
    <meta itemprop="duration" content="PT0M18S">
    <meta itemprop="unlisted" content="False">
    <meta itemprop="paid" content="False">
      <span itemprop="author" itemscope="" itemtype="http://schema.org/Person">
        <link itemprop="url" href="http://www.youtube.com/user/${videoData.owner}">
      </span>
    <link itemprop="thumbnailUrl" href="http://i3.ytimg.com/vi/${videoData.id}/hqdefault.jpg">
    <span itemprop="thumbnail" itemscope="" itemtype="http://schema.org/ImageObject">
      <link itemprop="url" href="http://i3.ytimg.com/vi/${videoData.id}/mqdefault.jpg">
      <meta itemprop="width" content="320">
      <meta itemprop="height" content="180">
    </span>
      <link itemprop="embedURL" href="http://www.youtube.com/v/${videoData.id}?version=3&amp;autohide=1">
      <meta itemprop="playerType" content="Flash">
      <meta itemprop="width" content="480">
      <meta itemprop="height" content="360">
      <meta itemprop="isFamilyFriendly" content="True">
<div id="watch-headline-container" class="${ytInitialPlayerResponse?.videoDetails ? "" : "hid"}">
<div id="watch-headline" class="watch-headline">
<h1 id="watch-headline-title">
<span id="eow-title" class="" dir="ltr" title="${title ? title : videoData.title}">
${title ? title : videoData.title}
</span>
</h1>
<div id="watch-headline-user-info">
<span class="yt-uix-button-group">
<button href="https://www.youtube.com${videoData.url}?feature=watch" type="button" class="start yt-uix-button yt-uix-button-default" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
<span class="yt-uix-button-content">${owner ? owner.text : videoData.owner}</span>
</button><div class="yt-subscription-button-hovercard yt-uix-hovercard">
<span class="yt-uix-button-context-light yt-uix-button-subscription-container">
<button href="" type="button" class="yt-subscription-button yt-subscription-button-js-default end yt-uix-button yt-uix-button-subscription yt-uix-tooltip ${VALUE_SUBBUTTON}" onclick="document.cosmicCat.func.subscribe();return false;" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-subscribe" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="yt-uix-button-content">
<span class="subscribe-label">${localizeString("buttons.subscribe")}</span>
<span class="subscribed-label">${localizeString("buttons.subscribed")}</span>
<span class="unsubscribe-label">${localizeString("buttons.unsubscribe")}</span>
</span>
</button>
<span class="yt-subscription-button-disabled-mask"></span>
</span>
<div class="yt-uix-hovercard-content hid">
<p class="loading-spinner">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
${localizeString("global.loading")}
</p>
</div>
</div>
</span>
</div>
<div id="watch-more-from-user" class="collapsed">
<div id="watch-channel-discoverbox" class="yt-rounded">
<span id="watch-channel-loading">${localizeString("global.loading")}</span>
</div>
</div>
</div>
</div>
<div id="watch-video-container">
<div id="watch-video">
<div id="watch-player" class="flash-player player-root wm-videoplayer">
</div>
</div>
</div>
<div id="watch-main-container" class="${ytInitialPlayerResponse?.videoDetails ? "" : "hid"}">
<div id="watch-main">
<div id="watch-panel">
<div id="watch-actions">
<div id="watch-actions">
<div id="watch-actions-right">
<span class="watch-view-count">
<strong>${views[0]}</strong>
</span>
<button onclick=";return false;" title="${localizeString("tooltip.statistics")}" type="button" id="watch-insight-button" class="yt-uix-tooltip yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" role="button"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-watch-insight" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Show video statistics"><span class="yt-valign-trick"></span></span></button>
</div>
<span id="watch-like-unlike" class="yt-uix-button-group"><button onclick="document.cosmicCat.Watch.likeVideo('${videoData.id}');return false;" title="${localizeString("tooltip.ilikethis")}" type="button" class="start yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" id="watch-like" role="button" data-tooltip-text="${localizeString("tooltip.ilikethis")}"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-watch-like" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("tooltip.ilikethis")}"><span class="yt-valign-trick"></span></span><span class="yt-uix-button-content">${localizeString("buttons.like")} </span></button><button onclick="document.cosmicCat.Watch.dislikeThis('${videoData.id}');return false;" title="${localizeString("tooltip.idislikethis")}" type="button" class="end yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" id="watch-unlike" role="button" data-tooltip-text="${localizeString("tooltip.idislikethis")}"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-watch-unlike" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("tooltip.idislikethis")}"><span class="yt-valign-trick"></span></span></button></span>
<button type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" onclick=";return false;" title="${localizeString("tooltip.addto")}" role="button" data-tooltip-text="${localizeString("tooltip.addto")}"><span class="yt-uix-button-content"><span class="addto-label">${localizeString("buttons.addto")}</span> </span></button>
<button onclick=";return false;" title="Share or embed this video" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" id="watch-share" data-button-action="yt.www.watch.actions.share" role="button" data-tooltip-text="${localizeString("tooltip.share")}"><span class="yt-uix-button-content">${localizeString("buttons.share")} </span></button>
<button onclick=";return false;" title="Flag as inappropriate" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" id="watch-flag" data-button-action="yt.www.watch.actions.flag" role="button" data-tooltip-text="${localizeString("tooltip.flag")}"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-watch-flag" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("tooltip.flag")}"><span class="yt-valign-trick"></span></span></button>
<button onclick=";return false;" title="${localizeString("tooltip.interactive")}" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" id="watch-transcript" data-button-action="yt.www.watch.actions.transcript" role="button"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-transcript" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Interactive Transcript"><span class="yt-valign-trick"></span></span></button>
</div>
</div>
<div id="watch-actions-area-container" class="hid">
<div id="watch-actions-area" class="yt-rounded">
<div id="watch-actions-loading" class="watch-actions-panel hid">${localizeString("global.loading")}</div>
<div id="watch-actions-logged-out" class="watch-actions-panel hid">
<div class="yt-alert yt-alert-warn yt-alert-small yt-alert-naked yt-rounded">
<span class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</span>
<div class="yt-alert-content">
<strong>
<a href="${document.cosmicCat.data.loginUrl}">Sign In</a> or <a href="https://www.youtube.com/signup">Sign Up</a> now!
</strong>
</div>
</div>
</div>
<div id="watch-actions-error" class="watch-actions-panel hid">
<div class="yt-alert yt-alert-error yt-alert-small yt-alert-naked yt-rounded">
<span class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</span>
<div id="watch-error-string" class="yt-alert-content"></div>
</div>
</div>
<div id="watch-actions-share" class="watch-actions-panel hid"></div>
<div id="watch-actions-ajax" class="watch-actions-panel hid"></div>
<div class="close">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="close-button" onclick="yt.www.watch.actions.hide();">
</div>
</div>
</div>
<div id="watch-info">
<div id="watch-description" class="yt-uix-expander-collapsed yt-uix-expander">
<div id="watch-description-clip">
<p id="watch-uploader-info">${localizeString("watch.uploaderinfo", videoData)}</p>
<div id="watch-description-text">
<p id="eow-description">${description ? description : videoData.description}</p>
</div>
<div id="watch-description-extras">
<h4>${localizeString("watch.category")}:</h4>
<p id="eow-category"><a href="//www.youtube.com/videos">${videoData.category}</a></p>
<h4>${localizeString("watch.tags")}:</h4>
<ul id="eow-tags" class="watch-info-tag-list" style="word-break: break-all;">
${VALUE_VIDEOTAGS}
</ul>
<h4>${localizeString("watch.license")}:</h4>
<p id="eow-reuse">Standard YouTube License</p>
</div>
</div>
<ul id="watch-description-extra-info">
<li>
<div class="video-extras-sparkbars" style="background-color:red">
<div class="video-extras-sparkbar-likes"></div>
</div>
<span class="video-extras-likes-dislikes">
${localizeString("stats.likesdislikes")}
</span>
</li>
</ul>
<div class="yt-horizontal-rule">
<span class="first"></span>
<span class="second"></span>
<span class="third"></span>
</div>
<div id="watch-description-toggle" class="yt-uix-expander-head">
<div id="watch-description-expand" class="expand">
<button type="button" class="metadata-inline yt-uix-button yt-uix-button-text" onclick="return false;" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.showmore")} <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Show more"></span>
</button>
</div>
<div id="watch-description-collapse" class="collapse">
<button type="button" class="metadata-inline yt-uix-button yt-uix-button-text" onclick="return false;" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.showless")} <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Show less"></span>
</button>
</div>
</div>
</div>
</div>
<div id="comments-view" data-type="highlights" class="hid">
<div class="comments-section">
<h4><strong>${localizeString("comments.topcomments")}</strong></h4>
<ul class="comment-list top hid"></ul>
</div>
<div class="comments-section">
<h4><strong>${localizeString("comments.allcomments")}</strong> (${ytInitialData.contents.twoColumnWatchNextResults.results ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(b => b.itemSectionRenderer) ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(b => b.itemSectionRenderer).itemSectionRenderer.contents[0].commentsEntryPointHeaderRenderer ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(b => b.itemSectionRenderer).itemSectionRenderer.contents[0].commentsEntryPointHeaderRenderer.commentCount ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(b => b.itemSectionRenderer).itemSectionRenderer.contents[0].commentsEntryPointHeaderRenderer.commentCount.simpleText : "0" : "0" : "0" : "0"}) <a class="comments-section-see-all" href="https://www.youtube.com/all_comments?v=${videoData.id}">${localizeString("global.seeall")}</a></h4>
<div class="comments-post-container clearfix">
<div class="comments-post-alert ${BOOL_LOGIN ? "hid": ""}">
<a href="${document.cosmicCat.data.loginUrl}">Sign In</a> or <a href="https://www.youtube.com/signup">Sign Up</a><span class="comments-post-form-rollover-text"> now to post a comment!</span>
</div>
<form class="comments-post ${BOOL_LOGIN ? "" : "hid"}" method="post">
<input type="text" id="session" hidden="">
<div class="yt-alert yt-alert-default yt-alert-error hid comments-post-message">
<div class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</div>
<div class="yt-alert-buttons"></div><div class="yt-alert-content" role="alert"></div></div>
<a href="/profile" class="yt-user-photo comments-post-profile">
<span class="video-thumb ux-thumb yt-thumb-square-46">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${document.cosmicCat.data.pfp}" alt="${document.cosmicCat.data.name}" width="46"><span class="vertical-align"></span>
</span>
</span>
</span>
</a>
<div class="comments-textarea-container" onclick="document.cosmicCat.Comments.Form.init();">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="comments-textarea-tip">
<label class="comments-textarea-label" data-upsell="comment">${localizeString("comments.respond")}</label>  <div class="yt-uix-form-input-fluid yt-grid-fluid ">
<textarea id="" class="yt-uix-form-textarea comments-textarea" onfocus="document.cosmicCat.Comments.Form.init();" data-upsell="comment" name="comment"></textarea>
</div>
</div>
<p class="comments-remaining">
${localizeString("comments.charactersremain")}
</p>
<p class="comments-threshold-countdown hid">
<span class="comments-threshold-count"></span> ${localizeString("comments.secondsremain")}
</p>
<p class="comments-post-buttons">
<button type="submit" class="comments-post yt-uix-button yt-uix-button-default" onclick=";return true;" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.post")} </span>
</button>
</p>
</form>
</div>
<ul class="comment-list all hid"></ul>
</div>
<div class="comments-section">
<div class="comments-pagination" data-ajax-enabled="true">
<div class="yt-uix-pager" role="navigation">
<a id="next-btn" onclick="document.cosmicCat.Comments.next(this.getAttribute('data-token'), this.getAttribute('data-page'))" class="yt-uix-button yt-uix-sessionlink yt-uix-pager-button yt-uix-button-default hid" data-page="2"><span class="yt-uix-button-content">Next »</span></a>
</div>
</div>
</div>
<ul>
<li class="hid" id="parent-comment-loading">${localizeString("comments.loading")}</li>
</ul>
<div id="comments-loading">${localizeString("global.loading")}</div>
</div>
</div>
<div id="watch-sidebar">
<div class="watch-sidebar-section">
<div id="watch-related-container">
<ul id="watch-related" class="video-list">
${OBJ_SUGGESTEDVIDEOS}
</ul>
<ul id="watch-more-related" class="video-list hid">
<li id="watch-more-related-loading">${localizeString("suggestions.loading")}</li>
</ul>
</div>
<div class="watch-sidebar-foot">
<p class="content">
<button type="button" id="watch-more-related-button" onclick="document.cosmicCat.load.moreSuggestedVideos(this.getAttribute('data-token'));return false;" class="yt-uix-button yt-uix-button-default" data-token="${VALUE_SUGGESTEDTOKEN}" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.loadmoresuggestions")}</span>
</button>
</p>
</div>
</div>
<span class="yt-vertical-rule-main"></span>
<span class="yt-vertical-rule-corner-top"></span>
<span class="yt-vertical-rule-corner-bottom"></span>
</div>
<div class="clear"></div>
</div>
<div style="visibility: hidden; height: 0px; padding: 0px; overflow: hidden;">
<div id="baseDiv"></div>
</div>
</div>
</div>
</div>`;
    }
    if(window.location.pathname.split("/")[1].match(/shorts/i)) {
        window.location.href = "https://www.youtube.com/watch?v=" + window.location.pathname.split("/")[2];
    }
    if(window.location.pathname.split("/")[1].match(/channel|user|^c{1}$/i)) {
        if (/community|videos|about|channels|playlists|membership|store/.test(window.location.pathname.split("/")[3])) window.location.href = window.location.pathname.split("/").slice(0,3).join("/");
        let data = {
            info: await document.cosmicCat.Channels.Fetch.Info(),
            videos: await document.cosmicCat.Channels.Fetch.Videos(),
            feed: await document.cosmicCat.Channels.Fetch.Feed(),
            subs: ytInitialData.header.c4TabbedHeaderRenderer?.subscriberCountText?.simpleText
        };

        document.head.querySelector("title").innerText = `${data.info.name}'s ${localizeString("global.channel")} - YouTube`;

        document.cosmicCat.func.waitForElm("#video-player").then(() => {
            document.cosmicCat.player.Create();
        });

        OBJ_CHANNEL = document.cosmicCat.Channels.renderPage(1, data);
    }
    if(window.location.pathname.split("/")[1].match(/results/i)) {
        let FUNC = (async () => {
            var searchpar = (new URL(document.location)).searchParams.get("search_query");
            searchpar = document.cosmicCat.func.escapeHtml(searchpar);
            document.cosmicCat.func.waitForElm("#page").then((elm) => elm.classList.add("search-base"));
            var results = ytInitialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
            var parse = "";
            for(let i = 0; i < results.length; i++) {
                if(results[i].videoRenderer) {
                    let videoData = document.cosmicCat.func.organizeVideoData(results[i].videoRenderer);
                    let main = `<li class="yt-grid-box result-item-video context-data-item" data-context-item-title="${videoData.title}" data-context-item-type="video" data-context-item-time="${videoData.time}" data-context-item-user="${videoData}" data-context-item-id="${videoData.id}" data-context-item-views="${videoData.views[0]}">
<div id="" class="yt-uix-tile yt-lockup-list yt-tile-default yt-grid-box">
<div class="yt-lockup-thumbnail">
<a href="https://www.youtube.com/watch?v=${videoData.id}" class="ux-thumb-wrap yt-uix-sessionlink yt-uix-contextlink contains-addto result-item-thumb">
<span class="video-thumb ux-thumb yt-thumb-default-185">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="//i3.ytimg.com/vi/${videoData.id}/mqdefault.jpg" alt="Thumbnail" width="185"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${videoData.time}</span>
<button onclick=";return false;" title="${localizeString("personal.watchlater")}" type="button" class="addto-button video-actions addto-watch-later-button-sign-in yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-button-menu-id="shared-addto-watch-later-login" data-video-ids="${videoData.id}" role="button">
<span class="yt-uix-button-content">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("personal.watchlater")}">
</span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></button>
</a>
</div>
<div class="yt-lockup-content">
<h3>
<a class="yt-uix-contextlink yt-uix-sessionlink yt-uix-tile-link result-item-translation-title" dir="ltr" title="${videoData.title}" href="https://www.youtube.com/watch?v=${videoData.id}">${videoData.title}</a>
</h3>
<p class="description" dir="ltr">${videoData.description}</p>
<div class="yt-lockup-meta">
<ul class="single-line-lego-list">
<li><a href="/web/20121031234035/http://www.youtube.com/results?search_query=new&amp;lclk=new/a" class="yt-badge-std">new</a></li>
<li><a href="/web/20121031234035/http://www.youtube.com/results?search_query=hd&amp;lclk=hd/a" class="yt-badge-std">hd</a></li>
</ul>
<p class="facets">
<span class="date-added">${videoData.views[1]}</span>
<span class="metadata-separator">•</span>
<span class="viewcount">${videoData.views[0]}</span>
</p>
<p><span class="username-prepend">${localizeString("watch.by", videoData)}</span></p>
</div>
</div>
</div>
</li>`;
                    parse += main;
                }
                if(results[i].channelRenderer) {
                    let channelData = document.cosmicCat.func.organizeChannelData(results[i].channelRenderer);

                    let main = `<div class="result-item yt-uix-tile yt-tile-default *sr channel">
<div class="thumb-container">
<a href="${channelData.link}" class="ux-thumb-wrap result-item-thumb">
<span class="video-thumb ux-thumb ux-thumb-profile-77">
<span class="clip" style="position:unset;">
<span class="clip-inner"><img onload="" alt="Thumbnail" src="${channelData.thumbnail}"><span class="vertical-align"></span></span>
</span>
</span>
</a>
</div>
<div class="result-item-main-content">
<h3>
<a href="${channelData.link}" class="yt-uix-tile-link" dir="ltr" title="${channelData.title}">${channelData.title}</a>
</h3>
<p id="video-description-" class="description" dir="ltr">${channelData.description}</p>
<ul class="single-line-lego-list">
<li>
<a href="https://www.youtube.com/results?search_type=search_users" class="yt-badge-std">CHANNEL</a>
</li>
</ul>
<p class="facets">
<span class="username-prepend">${localizeString("watch.by", channelData)}</span> <span class="metadata-separator"> | </span><span class="video-count">${channelData.videos}</span><span class="metadata-separator"> | </span><span class="channel-subscriber-count">${channelData.subs}</span>
</p>
</div>
</div>`;
                    parse += main;
                }
                if(results[i].playlistRenderer) {}
            }
            return `<div id="content">
<div id="search-header" class="yt-uix-expander yt-uix-expander-collapsed">
<h2>Search results for <strong class="query"><span class="search-title-lego">${searchpar}</span></strong></h2>
<div class="filter-top">
<button type="button" class="filter-button yt-uix-expander-head yt-uix-button yt-uix-button-default" onclick=";return false;" data-button-toggle="true" data-button-menu-id="some-nonexistent-menu" data-button-action="" role="button">
<span class="yt-uix-button-content">Filters </span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
</button>
<ul class="filter-crumb-list"></ul>
<p class="num-results">About <strong>${ytInitialData.estimatedResults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong> results</p>
<br class="clear">
</div>
<div id="filter-dropdown" class="yt-uix-expander-body">
<div class="filter-col">
<h4 class="filter-col-title">Sort by</h4>
<ul>
<li class="filter"><span class="filter-content filter-selected">Relevance</span></li>
<li class="filter">
<a href="https://www.youtube.com/results?search_query=${searchpar}&search_type=videos&amp;search_sort=video_date_uploaded" class="filter-content">Upload date</a>
</li>
<li class="filter">
<a href="https://www.youtube.com/results?search_query=${searchpar}&search_type=videos&amp;search_sort=video_view_count" class="filter-content">View count</a>
</li>
<li class="filter">
<a href="https://www.youtube.com/results?search_query=${searchpar}&search_type=videos&amp;search_sort=video_avg_rating" class="filter-content">Rating</a>
</li>
</ul>
</div>
<div class="filter-col">
<h4 class="filter-col-title">Upload Date</h4>
<ul>
<li class="filter">
<a class="filter-text filter-content" title="Search for last hour" href="https://www.youtube.com/results?search_query=${searchpar}&sp=EgQIARAB">Last hour</a>
</li>
<li class="filter">
<a class="filter-text filter-content" title="Search for today" href="https://www.youtube.com/results?search_query=${searchpar}&sp=EgIIAg%253D%253D">Today</a>
</li>
<li class="filter">
<a class="filter-text filter-content" title="Search for this week" href="https://www.youtube.com/results?search_query=${searchpar}&sp=EgQIAxAB">This week</a>
</li>
<li class="filter">
<a class="filter-text filter-content" title="Search for this month" href="https://www.youtube.com/results?search_query=${searchpar}&sp=EgQIBBAB">This month</a>
</li>
<li class="filter">
<a class="filter-text filter-content" title="Search for this year" href="https://www.youtube.com/results?search_query=${searchpar}&sp=EgQIBRAB">This year</a>
</li>
</ul>
</div>
<div class="filter-col">
<h4 class="filter-col-title">Result Type</h4>
<ul>
<li class="filter">
<a class="filter-text filter-content" title="Search for channel" href="/web/20121031234035/http://www.youtube.com/results?search_query=channel&amp;lclk=channel/a">Channel</a></li><li class="filter">
<a class="filter-text filter-content" title="Search for playlist" href="/web/20121031234035/http://www.youtube.com/results?search_query=playlist&amp;lclk=playlist/a">Playlist</a></li><li class="filter">
<a class="filter-text filter-content" title="Search for movie" href="/web/20121031234035/http://www.youtube.com/results?search_query=movie&amp;lclk=movie/a">Movie</a></li><li class="filter">
<a class="filter-text filter-content" title="Search for show" href="/web/20121031234035/http://www.youtube.com/results?search_query=show&amp;lclk=show/a">Show</a></li></ul>      </div>
<div class="filter-col">
<h4 class="filter-col-title">Duration</h4><ul><li class="filter">
<a class="filter-text filter-content" title="Search for short" href="/web/20121031234035/http://www.youtube.com/results?search_query=short&amp;lclk=short/a">Short (~4 minutes)</a></li><li class="filter">
<a class="filter-text filter-content" title="Search for long" href="/web/20121031234035/http://www.youtube.com/results?search_query=long&amp;lclk=long/a">Long (20~ minutes)</a></li></ul>      </div>
<div class="filter-col">
<h4 class="filter-col-title">Features</h4><ul><li class="filter">
<a class="filter-text filter-content" title="Search for hd" href="/web/20121031234035/http://www.youtube.com/results?search_query=hd&amp;lclk=hd/a">HD (high definition)</a></li><li class="filter">
<a class="filter-text filter-content" title="Search for cc" href="/web/20121031234035/http://www.youtube.com/results?search_query=cc&amp;lclk=cc/a">CC (closed caption)</a></li><li class="filter">
<a class="filter-text filter-content" title="Search for partner" href="/web/20121031234035/http://www.youtube.com/results?search_query=partner&amp;lclk=partner/a">Partner video</a></li><li class="filter">
<a class="filter-text filter-content" title="Search for creativecommons" href="/web/20121031234035/http://www.youtube.com/results?search_query=creativecommons&amp;lclk=creativecommons/a">Creative commons</a></li><li class="filter">
<a class="filter-text filter-content" title="Search for live" href="/web/20121031234035/http://www.youtube.com/results?search_query=live&amp;lclk=live/None">Live now</a></li>
<li class="filter">
<a class="filter-text filter-content" title="Search for 3d" href="/web/20121031234035/http://www.youtube.com/results?search_query=3d&amp;lclk=3d/a">3D</a>
</li>
</ul>
</div>
</div>
<div class="yt-horizontal-rule"><span class="first"></span><span class="second"></span><span class="third"></span></div>
</div>
<div id="search-base-div">
<div id="search-main" class="ytg-4col new-snippets">
<div id="results-main-content">
<ol id="search-results" class="result-list context-data-container">
${parse}
</ol>
</div>
</div>
</div>
<div id="search-footer-box" class="searchFooterBox">
<div class="yt-uix-pager" role="navigation">
<a href="/web/20121031234035/http://www.youtube.com/results?page=1" class="yt-uix-button yt-uix-sessionlink yt-uix-pager-button yt-uix-button-toggled yt-uix-button-default" data-sessionlink="ei=CMTh9u62rLMCFcPCRAodVVx_nQ%3D%3D" data-page="1" aria-label="Go to page 1">
<span class="yt-uix-button-content">1</span>
</a>
<a href="/web/20121031234035/http://www.youtube.com/results?page=2" class="yt-uix-button yt-uix-sessionlink yt-uix-pager-button yt-uix-button-default" data-sessionlink="ei=CMTh9u62rLMCFcPCRAodVVx_nQ%3D%3D" data-page="2">
<span class="yt-uix-button-content">Next »</span>
</a>
</div>
</div>
</div>`;
        })();
        OBJ_CHANNEL = await FUNC;
    }
    if(window.location.pathname.match(/\/feed\/explore/i)) {
        let CSS1 = `<link rel="stylesheet" href="//s.ytimg.com/yts/cssbin/www-videos-nav-vflWHHWFS.css""/>`;
        let CSS2 = `<link rel="stylesheet" href="//s.ytimg.com/yts/cssbin/www-browse-new-vflUr2lEG.css""/>`;

        document.body.setAttribute("class", "ytg-old-clearfix guide-feed-v2");

        document.head.innerHTML += CSS1 + CSS2;
        document.title = "Videos - YouTube";

        var c = "";
        document.cosmicCat.func.waitForElm("#page").then(async elm => {
            elm.setAttribute("class", "browse-base");
            let categories = ["most-viewed", "recommended", "music", "live", "gaming", "news", "sports", "edu", "howto"];
            for (let i = 0; i < categories.length; i++) {
                let videos = await document.cosmicCat.load.browse_category(categories[i]);
                let html = `<div class="browse-collection">
<div class="ytg-box collection-header with-icon">
<a class="heading ytg-box" href="">
<img class="header-icon ${videos.class}" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
<div class="header-container">
<h2>${videos.name} »</h2>
</div>
</a>
<a class="yt-playall-link yt-playall-link-default yt-uix-sessionlink" href="">
<img class="small-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
Play all
</a>
</div>
${videos.html}
</div>`;
                c += html;
            }
            document.querySelector(".load-more-content").innerHTML = c;
            document.querySelector("#feed-loading-template").classList.add("hid");
        });
        OBJ_CHANNEL = `<div id="baseDiv" class="video-info browse-base browse-videos">
<div id="masthead-subnav" class="yt-nav yt-nav-dark">
<ul>
<li class="selected">
<span class="yt-nav-item"class="yt-nav-item">Videos</span>
</li>
<li>
<span class="yt-nav-item">Music</span>
</li>
<li>
<span class="yt-nav-item">Movies</span>
</li>
<li>
<span class="yt-nav-item">Shows</span>
</li>
<li>
<span class="yt-nav-item">Trailers</span>
</li>
<li>
<span class="yt-nav-item">Live</span>
</li>
<li>
<span class="yt-nav-item">Sports</span>
</li>
<li>
<span class="yt-nav-item">Education</span>
</li>
<li class="last">
<span class="yt-nav-item">News</span>
</li>
</ul>
</div>
<div class="browse-container ytg-wide ytg-box no-stage browse-bg-gradient">
<div class="ytg-fl browse-content">
<div id="browse-side-column" class="ytg-2col ytg-last">
<ol class="navigation-menu">
<li class="menu-item">
<a class="selected" href="https://www.youtube.com/feed/explore">All Categories</a>
</li>
<li class="menu-item">
<a class="" href="">Recommended for You</a>
</li>
</ol>
</div>
<div id="browse-main-column" class="ytg-4col">
<div class="load-more-pagination">
<div id="feed-loading-template">
<div class="feed-message">
<p class="loading-spinner">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
${localizeString("global.loading")}
</p>
</div>
</div>
<div class="load-more-content">
${c}
</div>
</div>
</div>
</div>
</div>
<div class="clear"></div>
</div>`;
    }
    OBJ_MASTHEAD = `<div id="masthead" class="" dir="ltr">
<a id="logo-container" href="https://www.youtube.com/" title="YouTube home">
<img id="logo" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="YouTube home">
</a>
<div id="masthead-user-bar-container">
<div id="masthead-user-bar">
<div id="masthead-user">
${OBJ_USER}
</div>
</div>
</div>
<div id="masthead-search-bar-container">
<div id="masthead-search-bar">
<div id="masthead-nav">
<a href="https://www.youtube.com/feed/explore">${localizeString("global.browse")}</a>
<span class="masthead-link-separator">|</span>
<a href="https://youtube.com/upload">${localizeString("global.upload")}</a>
</div>
<form id="masthead-search" class="search-form consolidated-form" action="https://www.youtube.com/results" onsubmit="if (document.body.querySelector('#masthead-search-term').value == '') return false;">
<button class="search-btn-compontent search-button yt-uix-button yt-uix-button-default" onclick="if (document.querySelector('#masthead-search-term').value == '') return false; document.querySelector('#masthead-search').submit(); return false;;return true;" type="submit" id="search-btn" dir="ltr" tabindex="2" role="button">
<span class="yt-uix-button-content">${localizeString("global.search")}</span>
</button>
<div id="masthead-search-terms" class="masthead-search-terms-border" dir="ltr" style="border-color: rgb(192, 192, 192) rgb(217, 217, 217) rgb(217, 217, 217);">
<label>
<input id="masthead-search-term" onfocus="document.querySelector('#masthead-search').classList.add('focused');document.querySelector('#masthead-search-terms').setAttribute('style', 'border-color: rgb(77, 144, 254)')" onblur="document.querySelector('#masthead-search').classList.remove('focused');document.querySelector('#masthead-search-terms').setAttribute('style', 'border-color: rgb(192, 192, 192) rgb(217, 217, 217) rgb(217, 217, 217);')" autocomplete="off" class="search-term" name="search_query" value="" type="text" tabindex="1" title="${localizeString("global.search")}" dir="ltr" spellcheck="false" style="outline: currentcolor none medium;">
</label>
</div>
<input type="hidden" name="oq">
<input type="hidden" name="aq">
<input type="hidden" name="aqi">
<input type="hidden" name="aql">
<input type="hidden" name="gs_sm">
<input type="hidden" name="gs_upl">
</form>
</div>
</div>
</div>
${OBJ_MASTH}`;
    OBJ_FOOTER = `<div id="footer-container">
<div id="footer">
<div class="yt-horizontal-rule">
<span class="first"></span>
<span class="second"></span>
<span class="third"></span>
</div>
<div id="footer-logo">
<a href="https://www.youtube.com/" title="YouTube home">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="YouTube home">
</a>
<span id="footer-divider"></span>
</div>
<div id="footer-main">
<ul id="footer-links-primary">
<li>
<a href="https://support.google.com/youtube/#topic=9257498">${localizeString("global.help")}</a>
</li>
<li>
<a href="https://www.youtube.com/about">${localizeString("global.about")}</a>
</li>
<li>
<a href="https://www.youtube.com/press/">${localizeString("global.press")}</a>
</li>
<li>
<a href="https://www.youtube.com/copyright">${localizeString("global.copyright")}</a>
</li>
<li>
<a href="https://www.youtube.com/creators">${localizeString("global.creators")}</a>
</li>
<li>
<a href="https://www.youtube.com/ads">${localizeString("global.advertising")}</a>
</li>
</ul>
<ul class="pickers yt-uix-button-group" data-button-toggle-group="true">
<li>
<button type="button" class="yt-uix-button yt-uix-button-text" onclick="document.cosmicCat.load.picker('LANGUAGE');return false;" data-button-toggle="true" data-button-menu-id="arrow" role="button">
<span class="yt-uix-button-content">${document.cosmicCat.data.lang} </span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</button></li><li><button type="button" class="yt-uix-button yt-uix-button-text" onclick="document.cosmicCat.load.picker('COUNTRY');return false;" data-button-toggle="true" data-button-menu-id="arrow" role="button">
<span class="yt-uix-button-content">${document.cosmicCat.data.country} </span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</button></li><li><button type="button" class="yt-uix-button yt-uix-button-text" onclick="document.cosmicCat.load.picker('safetymode-picker');return false;" data-button-toggle="true" data-button-menu-id="arrow" role="button">
<span class="yt-uix-button-content">Safety: <span class="yt-footer-safety-value">Off</span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button>
</li>
</ul>
<div id="picker-container"></div>
<div id="picker-loading" style="display: none">${localizeString("global.loading")}</div>`;

    let final = `<div id="masthead-container">
${OBJ_MASTHEAD}
</div>
<div id="content-container">
${OBJ_CHANNEL}
</div>
${OBJ_FOOTER}`;
    SUPERDOM.innerHTML += final;
    SUPERDUM.appendChild(SUPERDOM);
    document.body.appendChild(SUPERDUM);
    yt.www.masthead.searchbox.init();
}
)()
