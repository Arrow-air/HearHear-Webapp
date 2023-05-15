var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_node_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 45,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 87,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error(error), responseStatusCode = 500;
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader
});
var import_node3 = require("@remix-run/node"), import_react2 = require("@remix-run/react");

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-GBAIIDFN.css";

// app/auth.server.ts
var import_remix_auth = require("remix-auth"), import_remix_auth_discord = require("remix-auth-discord");

// app/session.server.tsx
var import_node2 = require("@remix-run/node"), sessionStorage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: !0,
    secrets: ["s3cr3t"],
    secure: !1
  }
}), { getSession, commitSession, destroySession } = sessionStorage;

// app/auth.server.ts
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var auth = new import_remix_auth.Authenticator(sessionStorage), discordStrategy = new import_remix_auth_discord.DiscordStrategy(
  {
    clientID: process.env.DISCORD_CLIENT_ID || "",
    clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    callbackURL: "http://localhost:3000/auth/discord/callback",
    scope: ["identify", "email", "guilds"]
  },
  async ({
    accessToken,
    refreshToken,
    extraParams,
    profile
  }) => {
    var _a;
    let guilds = (await ((_a = await fetch("https://discord.com/api/v10/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })) == null ? void 0 : _a.json())).filter(
      (g) => g.owner || (BigInt(g.permissions) & BigInt(32)) == BigInt(32)
    );
    return {
      id: profile.id,
      displayName: profile.__json.username,
      avatar: profile.__json.avatar,
      discriminator: profile.__json.discriminator,
      email: profile.__json.email,
      accessToken,
      guilds,
      refreshToken
    };
  }
);
auth.use(discordStrategy);

// app/root.tsx
var import_react3 = require("@vercel/analytics/react"), import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), links = () => [
  { rel: "stylesheet", href: tailwind_default }
], loader = async ({ request }) => {
  let user = await auth.isAuthenticated(request);
  return user ? (0, import_node3.json)({ user }) : (0, import_node3.json)({ user: void 0 });
};
function App() {
  return (0, import_react2.useLoaderData)(), /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react3.Analytics, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 43,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 44,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 32,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx
var dashboard_guilds_guild_meetings_meeting_exports = {};
__export(dashboard_guilds_guild_meetings_meeting_exports, {
  action: () => action,
  default: () => MeetingPage,
  loader: () => loader2
});

// app/utils/hooks.tsx
var import_react4 = require("@remix-run/react"), import_react5 = require("react"), useRouteData = (routeId) => {
  var _a;
  return (_a = (0, import_react4.useMatches)().find((match) => match.id === routeId)) == null ? void 0 : _a.data;
}, useRouteParam = (routeId, paramName) => {
  var _a, _b;
  return (_b = (_a = (0, import_react4.useMatches)().find((match) => match.id === routeId)) == null ? void 0 : _a.params) == null ? void 0 : _b[paramName];
};
function meetingArrayEqual(a1, a2) {
  if (a1.length !== a2.length)
    return !1;
  for (let i = 0; i < a1.length; i++)
    if (a1[i].id !== a2[i].id || a1[i].guildId !== a2[i].guildId || a1[i].channelName !== a2[i].channelName)
      return !1;
  return !0;
}
var useMeetingArrayEffect = (cb, deps) => {
  let ref = (0, import_react5.useRef)(deps);
  meetingArrayEqual(deps, ref.current) || (ref.current = deps), (0, import_react5.useEffect)(cb, [ref.current]);
};
function insightArrayEqual(a1, a2, meetingId1, meetingId2, insightText1, insightText2) {
  if (meetingId1 !== meetingId2 || insightText1 !== insightText2 || a1.length !== a2.length)
    return !1;
  for (let i = 0; i < a1.length; i++)
    if (a1[i].id !== a2[i].id)
      return !1;
  return !0;
}
var useInsightArrayEffect = (cb, deps) => {
  let ref = (0, import_react5.useRef)(deps);
  insightArrayEqual(deps[0], ref.current[0], deps[1], ref.current[1]) || (ref.current = deps), (0, import_react5.useEffect)(cb, [ref.current]);
};

// app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx
var import_node4 = require("@remix-run/node"), import_react10 = require("@remix-run/react");

// app/components/insight/transactionModal.tsx
var import_react7 = require("react"), import_react8 = require("@headlessui/react"), import_outline = require("@heroicons/react/24/outline");

// app/utils/supabase.tsx
var import_supabase_js = require("@supabase/supabase-js");

// app/utils/db.tsx
var import_client_s3 = require("@aws-sdk/client-s3");

// app/utils/discord.tsx
var import_dotenv2 = require("dotenv");
(0, import_dotenv2.config)();
async function getChannelObject(channelId) {
  let response = await fetch(
    `https://discord.com/api/channels/${channelId}`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN || ""}`
      }
    }
  );
  if (response.status !== 200)
    throw new Error("Channel not found");
  return response.json();
}
function getChannelName(channel) {
  return channel.name || "Unknown Channel";
}
async function getChannelNameById(channelId) {
  try {
    let channel = await getChannelObject(channelId);
    return getChannelName(channel);
  } catch {
    return "Unknown Channel";
  }
}

// app/utils/timestamp.tsx
var import_strftime = __toESM(require("strftime"));
function convertUNIXToString(unixTimestamp, format) {
  let date_obj = new Date(Number(unixTimestamp));
  return (0, import_strftime.default)(format || "%B %d, %Y %I:%M %p", date_obj);
}

// app/utils/ai.tsx
var import_openai = require("openai");
function processTranscripts(transcripts) {
  return transcripts.map((transcript) => ({
    username: transcript.filename.split("-")[1].split(".")[0],
    timestamp: transcript.filename.split("-")[0],
    text: transcript.text
  }));
}

// app/utils/db.tsx
async function getProcessedTranscripts(guildId, channelId, meetingId, S3_BUCKET_REGION, S3_BUCKET_NAME) {
  let client = new import_client_s3.S3Client({
    region: S3_BUCKET_REGION
  }), command = new import_client_s3.ListObjectsV2Command({
    Bucket: S3_BUCKET_NAME,
    Prefix: guildId + "/" + channelId + "/" + meetingId
  });
  try {
    let isTruncated = !0, contents = [], transcripts = [];
    for (; isTruncated; ) {
      let { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
      if (Contents === void 0 || IsTruncated === void 0)
        break;
      Contents.map((c) => (c.Key !== void 0 && contents.push(c.Key), null)), isTruncated = IsTruncated, command.input.ContinuationToken = NextContinuationToken;
    }
    let transcriptFilePaths = contents.filter((c) => c.endsWith(".txt"));
    return await Promise.all(
      transcriptFilePaths.map(async (transcriptPath) => {
        let text = await getTextFromUrl(
          transcriptPath,
          S3_BUCKET_REGION,
          S3_BUCKET_NAME
        );
        transcripts.push({
          filename: transcriptPath.split("/").pop(),
          audio: null,
          text
        });
      })
    ), processTranscripts(transcripts);
  } catch (err) {
    return console.log(err), [];
  }
}
async function getTranscripts(guildId, channelId, meetingId, S3_BUCKET_REGION, S3_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY) {
  let client = new import_client_s3.S3Client({
    region: S3_BUCKET_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
  }), command = new import_client_s3.ListObjectsV2Command({
    Bucket: S3_BUCKET_NAME,
    Prefix: guildId + "/" + channelId + "/" + meetingId
  });
  try {
    let isTruncated = !0, contents = [], transcripts = [];
    for (; isTruncated; ) {
      let { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
      if (Contents === void 0 || IsTruncated === void 0)
        break;
      Contents.map((c) => (c.Key !== void 0 && contents.push(c.Key), null)), isTruncated = IsTruncated, command.input.ContinuationToken = NextContinuationToken;
    }
    let transcriptFilePaths = contents.filter((c) => c.endsWith(".txt"));
    return await Promise.all(
      transcriptFilePaths.map(async (transcriptPath) => {
        let text = await getTextFromUrl(
          transcriptPath,
          S3_BUCKET_REGION,
          S3_BUCKET_NAME
        );
        transcripts.push({
          filename: transcriptPath.split("/").pop(),
          audio: null,
          text
        });
      })
    ), transcripts.map((t) => {
      let audioFilePath = guildId + "/" + channelId + "/" + meetingId + "/" + t.filename.replace(".txt", ".ogg");
      return t.audio = getRecordingFileAsByteArray(
        audioFilePath,
        S3_BUCKET_REGION,
        S3_BUCKET_NAME
      ), null;
    }), transcripts;
  } catch (err) {
    return console.log(err), null;
  }
}
async function getTextFromUrl(url, S3_BUCKET_REGION, S3_BUCKET_NAME) {
  try {
    let client = new import_client_s3.S3Client({
      region: S3_BUCKET_REGION
    }), command = new import_client_s3.GetObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: url
    }), { Body } = await client.send(command);
    return Body === void 0 ? "" : await Body.transformToString();
  } catch (err) {
    return console.log(err), "";
  }
}
function getRecordingFileAsByteArray(filePath, S3_BUCKET_REGION, S3_BUCKET_NAME) {
  return new Promise((resolve, reject) => {
    try {
      let client = new import_client_s3.S3Client({
        region: S3_BUCKET_REGION
      }), command = new import_client_s3.GetObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: filePath
      });
      client.send(command).then(({ Body }) => {
        Body === void 0 && reject(), Body.transformToByteArray().then((byteArray) => {
          resolve(byteArray);
        });
      }).catch((err) => {
        console.log(err), resolve(new Uint8Array());
      });
    } catch (err) {
      console.log(err), reject();
    }
  });
}
async function buildMeetings(files) {
  let meetings = {}, channelNameCache = {};
  files.map((file) => {
    let [, channelId] = file.split("/");
    return channelNameCache[channelId] = "", null;
  });
  let text_files = files.filter((file) => file.endsWith(".txt"));
  await Promise.all(
    Object.keys(channelNameCache).map(async (channelId) => {
      let channelName = await getChannelNameById(channelId);
      channelNameCache[channelId] = channelName;
    })
  );
  let endTimes = {};
  return text_files.map((file) => {
    let meetingId = file.split("/")[2], filename = file.split("/")[3], timestamp = parseInt(filename.split("-")[0]);
    return endTimes[meetingId] === void 0 && (endTimes[meetingId] = timestamp), timestamp > endTimes[meetingId] && (endTimes[meetingId] = timestamp), null;
  }), text_files.map((file) => {
    let [guildId, channelId, meetingId] = file.split("/"), channelName = channelNameCache[channelId];
    return meetings[meetingId] = {
      id: meetingId,
      guildId,
      channelId,
      channelName,
      startTime: meetingId,
      endTime: endTimes[meetingId].toString()
    }, null;
  }), Object.values(meetings);
}
async function getRecordingPathAsStrings(guildId, S3_BUCKET_REGION, S3_BUCKET_NAME) {
  let client = new import_client_s3.S3Client({
    region: S3_BUCKET_REGION
  }), command = new import_client_s3.ListObjectsV2Command({
    Bucket: S3_BUCKET_NAME,
    Prefix: guildId
  });
  try {
    let isTruncated = !0, contents = [];
    for (; isTruncated; ) {
      let { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
      if (Contents === void 0 || IsTruncated === void 0)
        break;
      Contents.map((c) => (c.Key !== void 0 && contents.push(c.Key), null)), isTruncated = IsTruncated, command.input.ContinuationToken = NextContinuationToken;
    }
    return contents;
  } catch (err) {
    return console.error(err), [];
  }
}
async function getMeetings(guildId, S3_BUCKET_REGION, S3_BUCKET_NAME) {
  let files = await getRecordingPathAsStrings(
    guildId,
    S3_BUCKET_REGION,
    S3_BUCKET_NAME
  );
  return await buildMeetings(files);
}

// app/utils/supabase.tsx
var supabaseUrl = "https://yjezghyuqbzwxoovnlwo.supabase.co";
function createSupabaseClient(key) {
  return new MySupabaseClient(supabaseUrl, key);
}
var MySupabaseClient = class {
  constructor(url, key) {
    this.supabase = (0, import_supabase_js.createClient)(url, key);
  }
  getClient() {
    return this.supabase;
  }
  async loginUser(user) {
    try {
      await this.checkIfExists("users", "id", user.id) || await this.supabase.from("users").insert({
        id: user.id,
        display_name: user.displayName,
        discriminator: user.discriminator,
        credits: 500
      });
    } catch (e) {
      throw console.log(e), e;
    }
  }
  async logErrorMessage(message, meetingId) {
    await this.supabase.from("errors").insert({
      message,
      meeting_id: meetingId
    });
  }
  async batchCreateGuilds(userId, guilds) {
    console.log("inserting guilds");
    let guildsError = (await this.supabase.from("guilds").upsert(
      guilds.map((guild) => ({
        id: guild.id,
        owner: guild.owner
      })),
      { onConflict: "id", ignoreDuplicates: !0 }
    )).error;
    if (console.log(guildsError), guildsError)
      throw new Error(guildsError.message);
    console.log("inserting user-guild pairs");
    let { error } = await this.supabase.from("user_guild").upsert(
      guilds.map(
        (guild) => ({
          guild_id: guild.id,
          user_id: userId,
          hash: guild.id.concat(userId)
        }),
        { onConflict: "hash", ignoreDuplicates: !0 }
      )
    );
    if (console.log(error), error)
      throw new Error(error.message);
    console.log("done");
  }
  async getUserCredits(user) {
    await this.loginUser(user);
    let { data, error } = await this.supabase.from("users").select("credits").eq("id", user.id);
    if (error)
      throw new Error(error.message);
    return data && data.length > 0 ? data[0].credits : -1;
  }
  async addCredit(user, currentAmount, amount) {
    await this.loginUser(user);
    let { error } = await this.supabase.from("users").update({ credits: currentAmount + amount }).eq("id", user.id);
    if (error)
      throw new Error(error.message);
  }
  async saveProcessedTranscripts(guildId, channelId, meetingId, S3_BUCKET_REGION, S3_BUCKET_NAME) {
    if (!await this.checkIfExists("guilds", "id", guildId))
      try {
        await this.supabase.from("guilds").insert({ id: guildId });
      } catch (e) {
        console.log("guild insert error:", e);
      }
    if (!await this.checkIfExists("channels", "id", channelId))
      try {
        await this.supabase.from("channels").insert({ id: channelId, guild_id: guildId });
      } catch (e) {
        console.log("channel insert error:", e);
      }
    if (!await this.checkIfExists("meetings", "id", meetingId))
      try {
        await this.supabase.from("meetings").insert({
          id: meetingId,
          channel_id: channelId,
          guild_id: guildId
        });
      } catch (e) {
        console.log("meeting insert error:", e);
      }
    if (!await this.checkIfExists(
      "transcripts",
      "meeting_id",
      meetingId
    )) {
      let processedTranscripts = await getProcessedTranscripts(
        guildId,
        channelId,
        meetingId,
        S3_BUCKET_REGION,
        S3_BUCKET_NAME
      ), { error } = await this.supabase.from("transcripts").insert({
        meeting_id: meetingId,
        transcript: processedTranscripts
      });
      if (error)
        throw new Error(error.message);
    }
  }
  async getInsights(meetingId) {
    let { data, error } = await this.supabase.from("insights").select("*, user_id::text, meeting_id::text").eq("meeting_id", meetingId);
    if (error)
      throw new Error(error.message);
    if (data && data.length > 0) {
      let insights = [];
      return await Promise.all(
        data.map(async (row) => {
          let user = await this.supabase.from("users").select("*").eq("id", BigInt(row.user_id));
          if (user.error)
            throw new Error(user.error.message);
          let displayName = user.data && user.data.length >= 1 ? user.data[0].display_name : "", discriminator = user.data && user.data.length >= 1 ? user.data[0].discriminator : "";
          insights.push({
            id: row.id,
            created_at: row.created_at,
            displayName,
            discriminator,
            text: row.insight_text
          });
        })
      ), insights;
    }
    return [];
  }
  async uploadInsight(meeting, userId, insghtText) {
    try {
      if (!await this.checkIfExists(
        "guilds",
        "id",
        meeting.guildId
      ))
        try {
          await this.supabase.from("guilds").insert({ id: meeting.guildId });
        } catch (e) {
          console.log("guild insert error:", e);
        }
      if (!await this.checkIfExists(
        "channels",
        "id",
        meeting.channelId
      ))
        try {
          await this.supabase.from("channels").insert({ id: meeting.channelId, guild_id: meeting.guildId });
        } catch (e) {
          console.log("channel insert error:", e);
        }
      if (!await this.checkIfExists(
        "meetings",
        "id",
        meeting.id
      ))
        try {
          await this.supabase.from("meetings").insert({
            id: meeting.id,
            channel_id: meeting.channelId,
            guild_id: meeting.guildId
          });
        } catch (e) {
          console.log("meeting insert error:", e);
        }
      let { error } = await this.supabase.from("insights").insert({
        meeting_id: meeting.id,
        user_id: userId,
        insight_text: insghtText
      });
      if (console.log(error), error)
        throw new Error(error.message);
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async checkIfExists(tableName, columnToCheck, value) {
    let { data, error } = await this.supabase.from(tableName).select("*").eq(columnToCheck, value);
    if (error)
      throw console.log("error:", error), error;
    return (data !== null || data !== void 0) && data.length > 0;
  }
};

// app/components/insight/templateBuilder.tsx
var import_solid = require("@heroicons/react/24/solid"), import_react6 = require("react"), import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), TemplateBuilder = ({
  inputFields,
  setInputFields,
  preBuiltTemplates: preBuiltTemplates2
}) => {
  let [selectedTemplate, setSelectedTemplate] = (0, import_react6.useState)(0);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "mt-2 ml-[-4]", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { className: "text-md font-bold text-black", children: "Select a Template" }, void 0, !1, {
      fileName: "app/components/insight/templateBuilder.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "text-sm text-gray-600", children: "Select a template to generate insights from, or create your own by entering section names. To have accurate result, please make sure to have some description of the field in parenthesis." }, void 0, !1, {
      fileName: "app/components/insight/templateBuilder.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "w-full flex flex-row items-center justify-center mt-3 mx-auto", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-col items-center justify-center mx-auto", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
          "button",
          {
            className: `hover:bg-yellow-400 text-white font-bold p-1 rounded-lg ${selectedTemplate === 0 ? "ring-1 ring-yellow-500 bg-yellow-400" : "bg-gray-400"} `,
            onClick: () => {
              setSelectedTemplate(0), setInputFields(preBuiltTemplates2[0]);
            },
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_solid.DocumentTextIcon, { className: "text-white stroke-2 h-10 w-10 p-1" }, void 0, !1, {
              fileName: "app/components/insight/templateBuilder.tsx",
              lineNumber: 48,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/insight/templateBuilder.tsx",
            lineNumber: 37,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "text-xs font-bold text-gray-600 mt-1", children: "Memo" }, void 0, !1, {
          fileName: "app/components/insight/templateBuilder.tsx",
          lineNumber: 50,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/insight/templateBuilder.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-col items-center justify-center mx-auto", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
          "button",
          {
            className: ` hover:bg-yellow-400 text-white font-bold p-1 rounded-lg ${selectedTemplate === 1 ? "ring-1 ring-yellow-500 bg-yellow-400" : "bg-gray-400"} `,
            onClick: () => {
              setSelectedTemplate(1), setInputFields(preBuiltTemplates2[1]);
            },
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_solid.QuestionMarkCircleIcon, { className: "text-white stroke-2 h-10 w-10 p-1" }, void 0, !1, {
              fileName: "app/components/insight/templateBuilder.tsx",
              lineNumber: 64,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/insight/templateBuilder.tsx",
            lineNumber: 53,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "text-xs font-bold text-gray-600 mt-1", children: "FAQ" }, void 0, !1, {
          fileName: "app/components/insight/templateBuilder.tsx",
          lineNumber: 66,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/insight/templateBuilder.tsx",
        lineNumber: 52,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-col items-center justify-center mx-auto", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
          "button",
          {
            className: ` hover:bg-yellow-400 text-white font-bold p-1 rounded-lg ${selectedTemplate === 2 ? "ring-1 ring-yellow-500 bg-yellow-400" : "bg-gray-400"} `,
            onClick: () => {
              setSelectedTemplate(2), setInputFields([]);
            },
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_solid.Cog6ToothIcon, { className: "text-white stroke-2 h-10 w-10 p-1" }, void 0, !1, {
              fileName: "app/components/insight/templateBuilder.tsx",
              lineNumber: 80,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/insight/templateBuilder.tsx",
            lineNumber: 69,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "text-xs font-bold text-gray-600 mt-1", children: "Custom" }, void 0, !1, {
          fileName: "app/components/insight/templateBuilder.tsx",
          lineNumber: 82,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/insight/templateBuilder.tsx",
        lineNumber: 68,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/insight/templateBuilder.tsx",
      lineNumber: 35,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "w-full mt-6 space-y-2 rounded-lg border border-gray-300 p-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("ul", { className: "max-h-[10rem]  overflow-auto", children: inputFields.map((field, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        "li",
        {
          className: "flex items-center justify-between rounded-lg hover:bg-gray-100 p-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
              "input",
              {
                type: "text",
                placeholder: "Enter a section name. e.g., Critical Analysis",
                value: field,
                className: "text-sm font-bold text-gray-700 w-full",
                onChange: (e) => {
                  let newValue = e.target.value;
                  setInputFields(
                    inputFields.map(
                      (item, i) => i === index ? newValue : item
                    )
                  );
                }
              },
              void 0,
              !1,
              {
                fileName: "app/components/insight/templateBuilder.tsx",
                lineNumber: 93,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
              "button",
              {
                className: "text-red-500",
                onClick: () => {
                  setInputFields(inputFields.filter((_, i) => i !== index));
                },
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_solid.TrashIcon, { className: "stroke-2 h-6 w-6 p-1" }, void 0, !1, {
                  fileName: "app/components/insight/templateBuilder.tsx",
                  lineNumber: 113,
                  columnNumber: 17
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/components/insight/templateBuilder.tsx",
                lineNumber: 107,
                columnNumber: 15
              },
              this
            )
          ]
        },
        index,
        !0,
        {
          fileName: "app/components/insight/templateBuilder.tsx",
          lineNumber: 89,
          columnNumber: 13
        },
        this
      )) }, void 0, !1, {
        fileName: "app/components/insight/templateBuilder.tsx",
        lineNumber: 87,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        "button",
        {
          className: "w-full bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center justify-center disabled:bg-gray-400 disabled:hover:bg-gray-400",
          disabled: inputFields.some((item) => item === "" || item === null),
          onClick: () => {
            setInputFields([...inputFields, ""]);
          },
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_solid.PlusIcon, { className: "stroke-2 h-6 w-6 p-1" }, void 0, !1, {
            fileName: "app/components/insight/templateBuilder.tsx",
            lineNumber: 125,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/components/insight/templateBuilder.tsx",
          lineNumber: 118,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/insight/templateBuilder.tsx",
      lineNumber: 86,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/insight/templateBuilder.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
};

// app/components/insight/transactionModal.tsx
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime"), INSIGHT_GENERATION_COST = 0, preBuiltTemplates = {
  0: ["Subject", "Summary", "Action Items (by participants)"],
  1: ["Subject", "Summary", "Frequently Asked Questions (by participant)"]
}, GenerateInsight = ({
  meeting,
  supabaseKey,
  user,
  fetchInsights
}) => {
  let [open, setOpen] = (0, import_react7.useState)(!1), [loading, setLoading] = (0, import_react7.useState)(!1), [userCredits, setUserCredits] = (0, import_react7.useState)(0), [inputFields, setInputFields] = (0, import_react7.useState)(
    preBuiltTemplates[0]
  ), cancelButtonRef = (0, import_react7.useRef)(null), handleSetInputFields = (value) => {
    setInputFields(value);
  }, supabase = createSupabaseClient(supabaseKey);
  (0, import_react7.useEffect)(() => {
    setLoading(!0), (async () => {
      try {
        let credits = await supabase.getUserCredits(user);
        setUserCredits(credits);
      } catch (error) {
        console.log(error);
      }
    })(), setLoading(!1);
  }, [userCredits]);
  let handleTransaction = async () => {
    await directToPurchase();
  }, directToPurchase = async () => {
    try {
      await supabase.addCredit(user, userCredits, 100), setUserCredits(userCredits + 100);
    } catch (error) {
      console.log(error);
    }
  }, handleSubmit = async (e) => {
    setLoading(!0);
    let formData = new FormData();
    formData.append("requestType", JSON.stringify("generateInsightForMeeting")), formData.append("inputFields", JSON.stringify(inputFields)), formData.append("guildId", JSON.stringify(meeting.guildId)), formData.append("channelId", JSON.stringify(meeting.channelId)), formData.append("meetingId", JSON.stringify(meeting.id)), formData.append("userId", JSON.stringify(user.id)), formData.append("userCredits", JSON.stringify(userCredits)), formData.append(
      "insightGenerationCost",
      JSON.stringify(INSIGHT_GENERATION_COST)
    ), await fetch(
      `/dashboard/guilds/${meeting.guildId}/meetings/${meeting.channelId}-${meeting.id}`,
      {
        method: "POST",
        body: formData
      }
    ).catch((error) => {
      console.log(error);
    }), setLoading(!1), setOpen(!1);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_jsx_dev_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
      "button",
      {
        className: "bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded-full disabled:bg-gray-400",
        onClick: () => setOpen(!0),
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_outline.PlusIcon, { className: "text-white stroke-2 h-5 w-5" }, void 0, !1, {
          fileName: "app/components/insight/transactionModal.tsx",
          lineNumber: 115,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/insight/transactionModal.tsx",
        lineNumber: 110,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_react8.Transition.Root, { show: open, as: import_react7.Fragment, children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
      import_react8.Dialog,
      {
        as: "div",
        className: "relative z-10",
        initialFocus: cancelButtonRef,
        onClose: (v3) => {
          loading || setOpen(v3);
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
            import_react8.Transition.Child,
            {
              as: import_react7.Fragment,
              enter: "ease-out duration-300",
              enterFrom: "opacity-0",
              enterTo: "opacity-100",
              leave: "ease-in duration-200",
              leaveFrom: "opacity-100",
              leaveTo: "opacity-0",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, void 0, !1, {
                fileName: "app/components/insight/transactionModal.tsx",
                lineNumber: 136,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/components/insight/transactionModal.tsx",
              lineNumber: 127,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "fixed inset-0 z-10 overflow-y-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
            import_react8.Transition.Child,
            {
              as: import_react7.Fragment,
              enter: "ease-out duration-300",
              enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
              enterTo: "opacity-100 translate-y-0 sm:scale-100",
              leave: "ease-in duration-200",
              leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
              leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_react8.Dialog.Panel, { className: "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "sm:flex sm:items-start", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 sm:mx-0 sm:h-10 sm:w-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                    import_outline.BanknotesIcon,
                    {
                      className: "h-6 w-6 text-white",
                      "aria-hidden": "true"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/insight/transactionModal.tsx",
                      lineNumber: 154,
                      columnNumber: 25
                    },
                    this
                  ) }, void 0, !1, {
                    fileName: "app/components/insight/transactionModal.tsx",
                    lineNumber: 153,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "mt-3 text-center w-full sm:ml-4 sm:mt-0 sm:text-left", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                      import_react8.Dialog.Title,
                      {
                        as: "h1",
                        className: "text-xl font-bold leading-6 text-gray-900",
                        children: "Insight Generation Confirmation"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/components/insight/transactionModal.tsx",
                        lineNumber: 160,
                        columnNumber: 25
                      },
                      this
                    ),
                    loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex justify-center mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h2", { className: "text-sm font-bold leading-6 text-sky-700", children: "If this is a long meeting, this may take a few minutes. Please do not close this window or refresh the page. But you can probably go get a coffee." }, void 0, !1, {
                      fileName: "app/components/insight/transactionModal.tsx",
                      lineNumber: 168,
                      columnNumber: 29
                    }, this) }, void 0, !1, {
                      fileName: "app/components/insight/transactionModal.tsx",
                      lineNumber: 167,
                      columnNumber: 27
                    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                      TemplateBuilder,
                      {
                        inputFields,
                        setInputFields: handleSetInputFields,
                        preBuiltTemplates
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/components/insight/transactionModal.tsx",
                        lineNumber: 176,
                        columnNumber: 27
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(HasEnoughCredits, { userCredits }, void 0, !1, {
                      fileName: "app/components/insight/transactionModal.tsx",
                      lineNumber: 182,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/components/insight/transactionModal.tsx",
                    lineNumber: 159,
                    columnNumber: 23
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/components/insight/transactionModal.tsx",
                  lineNumber: 152,
                  columnNumber: 21
                }, this) }, void 0, !1, {
                  fileName: "app/components/insight/transactionModal.tsx",
                  lineNumber: 151,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6", children: [
                  userCredits < INSIGHT_GENERATION_COST ? /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                    "button",
                    {
                      type: "button",
                      className: "inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto",
                      onClick: handleTransaction,
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { children: "Purchase Credits " }, void 0, !1, {
                        fileName: "app/components/insight/transactionModal.tsx",
                        lineNumber: 193,
                        columnNumber: 25
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/insight/transactionModal.tsx",
                      lineNumber: 188,
                      columnNumber: 23
                    },
                    this
                  ) : /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_jsx_dev_runtime4.Fragment, { children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                    "button",
                    {
                      type: "button",
                      disabled: !0,
                      className: "inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto",
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { children: "Generating..." }, void 0, !1, {
                        fileName: "app/components/insight/transactionModal.tsx",
                        lineNumber: 203,
                        columnNumber: 29
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/insight/transactionModal.tsx",
                      lineNumber: 198,
                      columnNumber: 27
                    },
                    this
                  ) : /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                    "button",
                    {
                      type: "button",
                      className: "inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto",
                      onClick: handleSubmit,
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { children: "Confirm" }, void 0, !1, {
                        fileName: "app/components/insight/transactionModal.tsx",
                        lineNumber: 211,
                        columnNumber: 29
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/insight/transactionModal.tsx",
                      lineNumber: 206,
                      columnNumber: 27
                    },
                    this
                  ) }, void 0, !1, {
                    fileName: "app/components/insight/transactionModal.tsx",
                    lineNumber: 196,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                    "button",
                    {
                      type: "button",
                      className: "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",
                      onClick: () => {
                        loading || setOpen(!1);
                      },
                      ref: cancelButtonRef,
                      children: "Cancel"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/insight/transactionModal.tsx",
                      lineNumber: 217,
                      columnNumber: 21
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "app/components/insight/transactionModal.tsx",
                  lineNumber: 186,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/components/insight/transactionModal.tsx",
                lineNumber: 150,
                columnNumber: 17
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/components/insight/transactionModal.tsx",
              lineNumber: 141,
              columnNumber: 15
            },
            this
          ) }, void 0, !1, {
            fileName: "app/components/insight/transactionModal.tsx",
            lineNumber: 140,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/components/insight/transactionModal.tsx",
            lineNumber: 139,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/insight/transactionModal.tsx",
        lineNumber: 119,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/insight/transactionModal.tsx",
      lineNumber: 118,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/insight/transactionModal.tsx",
    lineNumber: 109,
    columnNumber: 5
  }, this);
}, HasEnoughCredits = ({ userCredits }) => /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "mt-10 border rounded-lg p-4 w-full", children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "text-sm font-semibold", children: "Receipt Preview" }, void 0, !1, {
    fileName: "app/components/insight/transactionModal.tsx",
    lineNumber: 244,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "border-b my-2" }, void 0, !1, {
    fileName: "app/components/insight/transactionModal.tsx",
    lineNumber: 245,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "text-sm text-gray-700", children: "Current Balance:" }, void 0, !1, {
      fileName: "app/components/insight/transactionModal.tsx",
      lineNumber: 247,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "text-sm text-gray-700", children: [
      userCredits,
      " credits"
    ] }, void 0, !0, {
      fileName: "app/components/insight/transactionModal.tsx",
      lineNumber: 248,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/insight/transactionModal.tsx",
    lineNumber: 246,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "text-sm text-sky-800 font-bold", children: "Cost:" }, void 0, !1, {
      fileName: "app/components/insight/transactionModal.tsx",
      lineNumber: 251,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "text-sm text-sky-800 font-bold", children: INSIGHT_GENERATION_COST === 0 ? "free" : `${INSIGHT_GENERATION_COST} credits` }, void 0, !1, {
      fileName: "app/components/insight/transactionModal.tsx",
      lineNumber: 252,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/insight/transactionModal.tsx",
    lineNumber: 250,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "border-t my-2" }, void 0, !1, {
    fileName: "app/components/insight/transactionModal.tsx",
    lineNumber: 258,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "text-sm text-gray-700", children: "New Balance:" }, void 0, !1, {
      fileName: "app/components/insight/transactionModal.tsx",
      lineNumber: 260,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "text-sm text-gray-700", children: userCredits < INSIGHT_GENERATION_COST ? /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: "text-red-500", children: [
      userCredits - INSIGHT_GENERATION_COST,
      " credits"
    ] }, void 0, !0, {
      fileName: "app/components/insight/transactionModal.tsx",
      lineNumber: 263,
      columnNumber: 13
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: "text-green-500", children: [
      userCredits - INSIGHT_GENERATION_COST,
      " credits"
    ] }, void 0, !0, {
      fileName: "app/components/insight/transactionModal.tsx",
      lineNumber: 267,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/insight/transactionModal.tsx",
      lineNumber: 261,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/insight/transactionModal.tsx",
    lineNumber: 259,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/components/insight/transactionModal.tsx",
  lineNumber: 243,
  columnNumber: 5
}, this);

// app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx
var import_outline2 = require("@heroicons/react/24/outline"), import_react11 = require("react");
var import_react_markdown = __toESM(require("react-markdown"));

// app/assets/lottie/no-meeting.json
var no_meeting_exports = {};
__export(no_meeting_exports, {
  assets: () => assets,
  ddd: () => ddd,
  default: () => no_meeting_default,
  fr: () => fr,
  h: () => h,
  ip: () => ip,
  layers: () => layers,
  markers: () => markers,
  nm: () => nm,
  op: () => op,
  v: () => v,
  w: () => w
});
var v = "5.6.4", fr = 24, ip = 0, op = 118, w = 797, h = 908, nm = "Sleeping Cat 4", ddd = 0, assets = [], layers = [{ ddd: 0, ind: 1, ty: 3, nm: "Null 1", sr: 1, ks: { o: { a: 0, k: 0, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [398, 454, 0], ix: 2 }, a: { a: 0, k: [50, 50, 0], ix: 1 }, s: { a: 0, k: [243, 243, 100], ix: 6 } }, ao: 0, ip: 0, op: 240, st: 0, bm: 0 }, { ddd: 0, ind: 4, ty: 3, nm: "Null 10", sr: 1, ks: { o: { a: 0, k: 0, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [379.5, 464, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } }, ao: 0, ip: 0, op: 240, st: 0, bm: 0 }, { ddd: 0, ind: 5, ty: 4, nm: "Layer 4 Outlines 7", parent: 4, sr: 1, ks: { o: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 276, s: [100] }, { t: 282, s: [0] }], ix: 11 }, r: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 187, s: [0] }, { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 211, s: [-23] }, { t: 235, s: [0] }], ix: 10, x: `var $bm_rt;
$bm_rt = loopOut('cycle', 0);` }, p: { a: 1, k: [{ i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 187, s: [234.215, -141.867, 0], to: [14.417, -18.75, 0], ti: [-14.417, 18.75, 0] }, { t: 282, s: [320.715, -254.367, 0] }], ix: 2 }, a: { a: 0, k: [6.83, 7.826, 0], ix: 1 }, s: { a: 1, k: [{ i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 187, s: [0, 0, 100] }, { t: 282, s: [243, 243, 100] }], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[-0.132, 0.114], [0, 0], [0, 0], [0.187, 0.22], [-0.046, 0.305], [-0.245, 0.165], [-0.423, -0.064], [0, 0], [0.141, -0.942], [0.209, -0.243], [0.601, -0.522], [0, 0], [0, 0], [-0.186, -0.209], [0.048, -0.318], [0.242, -0.161], [0.43, 0.064], [0, 0], [0.264, 0.317], [-0.069, 0.455], [-0.07, 0.124], [-0.101, 0.103], [-0.176, 0.156]], o: [[0, 0], [0, 0], [-0.424, -0.064], [-0.187, -0.219], [0.047, -0.319], [0.245, -0.164], [0, 0], [1.011, 0.152], [-0.068, 0.45], [-0.208, 0.243], [0, 0], [0, 0], [0.431, 0.065], [0.185, 0.21], [-0.049, 0.331], [-0.241, 0.162], [0, 0], [-0.605, -0.091], [-0.265, -0.317], [0.023, -0.156], [0.07, -0.123], [0.102, -0.103], [0.177, -0.155]], v: [[-5.236, 2.854], [3.073, -4.518], [-2.98, -5.426], [-3.897, -5.85], [-4.108, -6.637], [-3.67, -7.361], [-2.667, -7.512], [5.135, -6.342], [6.439, -4.702], [6.025, -3.663], [4.81, -2.516], [-2.953, 4.335], [4.307, 5.424], [5.231, 5.835], [5.437, 6.628], [5.001, 7.365], [3.994, 7.512], [-4.912, 6.174], [-6.216, 5.563], [-6.511, 4.404], [-6.372, 3.984], [-6.116, 3.645], [-5.699, 3.258]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.29411764705882354, 0.29411764705882354, 0.29411764705882354, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [6.83, 7.826], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 4, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }], ip: 187, op: 283, st: 187, bm: 0 }, { ddd: 0, ind: 6, ty: 4, nm: "Layer 4 Outlines 6", parent: 4, sr: 1, ks: { o: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 219, s: [100] }, { t: 225, s: [0] }], ix: 11 }, r: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 130, s: [0] }, { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 154, s: [-23] }, { t: 178, s: [0] }], ix: 10, x: `var $bm_rt;
$bm_rt = loopOut('cycle', 0);` }, p: { a: 1, k: [{ i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 130, s: [234.215, -141.867, 0], to: [14.417, -18.75, 0], ti: [-14.417, 18.75, 0] }, { t: 225, s: [320.715, -254.367, 0] }], ix: 2 }, a: { a: 0, k: [6.83, 7.826, 0], ix: 1 }, s: { a: 1, k: [{ i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 130, s: [0, 0, 100] }, { t: 225, s: [243, 243, 100] }], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[-0.132, 0.114], [0, 0], [0, 0], [0.187, 0.22], [-0.046, 0.305], [-0.245, 0.165], [-0.423, -0.064], [0, 0], [0.141, -0.942], [0.209, -0.243], [0.601, -0.522], [0, 0], [0, 0], [-0.186, -0.209], [0.048, -0.318], [0.242, -0.161], [0.43, 0.064], [0, 0], [0.264, 0.317], [-0.069, 0.455], [-0.07, 0.124], [-0.101, 0.103], [-0.176, 0.156]], o: [[0, 0], [0, 0], [-0.424, -0.064], [-0.187, -0.219], [0.047, -0.319], [0.245, -0.164], [0, 0], [1.011, 0.152], [-0.068, 0.45], [-0.208, 0.243], [0, 0], [0, 0], [0.431, 0.065], [0.185, 0.21], [-0.049, 0.331], [-0.241, 0.162], [0, 0], [-0.605, -0.091], [-0.265, -0.317], [0.023, -0.156], [0.07, -0.123], [0.102, -0.103], [0.177, -0.155]], v: [[-5.236, 2.854], [3.073, -4.518], [-2.98, -5.426], [-3.897, -5.85], [-4.108, -6.637], [-3.67, -7.361], [-2.667, -7.512], [5.135, -6.342], [6.439, -4.702], [6.025, -3.663], [4.81, -2.516], [-2.953, 4.335], [4.307, 5.424], [5.231, 5.835], [5.437, 6.628], [5.001, 7.365], [3.994, 7.512], [-4.912, 6.174], [-6.216, 5.563], [-6.511, 4.404], [-6.372, 3.984], [-6.116, 3.645], [-5.699, 3.258]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.29411764705882354, 0.29411764705882354, 0.29411764705882354, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [6.83, 7.826], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 4, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }], ip: 130, op: 226, st: 130, bm: 0 }, { ddd: 0, ind: 7, ty: 4, nm: "Layer 4 Outlines 5", parent: 4, sr: 1, ks: { o: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 150, s: [100] }, { t: 156, s: [0] }], ix: 11 }, r: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 61, s: [0] }, { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 85, s: [-23] }, { t: 109, s: [0] }], ix: 10, x: `var $bm_rt;
$bm_rt = loopOut('cycle', 0);` }, p: { a: 1, k: [{ i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 61, s: [234.215, -141.867, 0], to: [14.417, -18.75, 0], ti: [-14.417, 18.75, 0] }, { t: 156, s: [320.715, -254.367, 0] }], ix: 2 }, a: { a: 0, k: [6.83, 7.826, 0], ix: 1 }, s: { a: 1, k: [{ i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 61, s: [0, 0, 100] }, { t: 156, s: [243, 243, 100] }], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[-0.132, 0.114], [0, 0], [0, 0], [0.187, 0.22], [-0.046, 0.305], [-0.245, 0.165], [-0.423, -0.064], [0, 0], [0.141, -0.942], [0.209, -0.243], [0.601, -0.522], [0, 0], [0, 0], [-0.186, -0.209], [0.048, -0.318], [0.242, -0.161], [0.43, 0.064], [0, 0], [0.264, 0.317], [-0.069, 0.455], [-0.07, 0.124], [-0.101, 0.103], [-0.176, 0.156]], o: [[0, 0], [0, 0], [-0.424, -0.064], [-0.187, -0.219], [0.047, -0.319], [0.245, -0.164], [0, 0], [1.011, 0.152], [-0.068, 0.45], [-0.208, 0.243], [0, 0], [0, 0], [0.431, 0.065], [0.185, 0.21], [-0.049, 0.331], [-0.241, 0.162], [0, 0], [-0.605, -0.091], [-0.265, -0.317], [0.023, -0.156], [0.07, -0.123], [0.102, -0.103], [0.177, -0.155]], v: [[-5.236, 2.854], [3.073, -4.518], [-2.98, -5.426], [-3.897, -5.85], [-4.108, -6.637], [-3.67, -7.361], [-2.667, -7.512], [5.135, -6.342], [6.439, -4.702], [6.025, -3.663], [4.81, -2.516], [-2.953, 4.335], [4.307, 5.424], [5.231, 5.835], [5.437, 6.628], [5.001, 7.365], [3.994, 7.512], [-4.912, 6.174], [-6.216, 5.563], [-6.511, 4.404], [-6.372, 3.984], [-6.116, 3.645], [-5.699, 3.258]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.29411764705882354, 0.29411764705882354, 0.29411764705882354, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [6.83, 7.826], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 4, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }], ip: 61, op: 157, st: 61, bm: 0 }, { ddd: 0, ind: 8, ty: 4, nm: "Layer 4 Outlines 4", parent: 4, sr: 1, ks: { o: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 79, s: [100] }, { t: 95, s: [0] }], ix: 11 }, r: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] }, { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 24, s: [-23] }, { t: 48, s: [0] }], ix: 10, x: `var $bm_rt;
$bm_rt = loopOut('cycle', 0);` }, p: { a: 1, k: [{ i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 0, s: [234.215, -141.867, 0], to: [14.417, -18.75, 0], ti: [-14.417, 18.75, 0] }, { t: 95, s: [320.715, -254.367, 0] }], ix: 2 }, a: { a: 0, k: [6.83, 7.826, 0], ix: 1 }, s: { a: 1, k: [{ i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [0, 0, 100] }, { t: 95, s: [243, 243, 100] }], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[-0.132, 0.114], [0, 0], [0, 0], [0.187, 0.22], [-0.046, 0.305], [-0.245, 0.165], [-0.423, -0.064], [0, 0], [0.141, -0.942], [0.209, -0.243], [0.601, -0.522], [0, 0], [0, 0], [-0.186, -0.209], [0.048, -0.318], [0.242, -0.161], [0.43, 0.064], [0, 0], [0.264, 0.317], [-0.069, 0.455], [-0.07, 0.124], [-0.101, 0.103], [-0.176, 0.156]], o: [[0, 0], [0, 0], [-0.424, -0.064], [-0.187, -0.219], [0.047, -0.319], [0.245, -0.164], [0, 0], [1.011, 0.152], [-0.068, 0.45], [-0.208, 0.243], [0, 0], [0, 0], [0.431, 0.065], [0.185, 0.21], [-0.049, 0.331], [-0.241, 0.162], [0, 0], [-0.605, -0.091], [-0.265, -0.317], [0.023, -0.156], [0.07, -0.123], [0.102, -0.103], [0.177, -0.155]], v: [[-5.236, 2.854], [3.073, -4.518], [-2.98, -5.426], [-3.897, -5.85], [-4.108, -6.637], [-3.67, -7.361], [-2.667, -7.512], [5.135, -6.342], [6.439, -4.702], [6.025, -3.663], [4.81, -2.516], [-2.953, 4.335], [4.307, 5.424], [5.231, 5.835], [5.437, 6.628], [5.001, 7.365], [3.994, 7.512], [-4.912, 6.174], [-6.216, 5.563], [-6.511, 4.404], [-6.372, 3.984], [-6.116, 3.645], [-5.699, 3.258]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.29411764705882354, 0.29411764705882354, 0.29411764705882354, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [6.83, 7.826], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 4, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }], ip: 0, op: 96, st: 0, bm: 0 }, { ddd: 0, ind: 9, ty: 4, nm: "Layer 4 Outlines 3", parent: 4, sr: 1, ks: { o: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 25, s: [100] }, { t: 39, s: [0] }], ix: 11 }, r: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: -56, s: [0] }, { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: -32, s: [-23] }, { t: -8, s: [0] }], ix: 10, x: `var $bm_rt;
$bm_rt = loopOut('cycle', 0);` }, p: { a: 1, k: [{ i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: -56, s: [234.215, -141.867, 0], to: [14.417, -18.75, 0], ti: [-14.417, 18.75, 0] }, { t: 39, s: [320.715, -254.367, 0] }], ix: 2 }, a: { a: 0, k: [6.83, 7.826, 0], ix: 1 }, s: { a: 1, k: [{ i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: -56, s: [0, 0, 100] }, { t: 39, s: [243, 243, 100] }], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[-0.132, 0.114], [0, 0], [0, 0], [0.187, 0.22], [-0.046, 0.305], [-0.245, 0.165], [-0.423, -0.064], [0, 0], [0.141, -0.942], [0.209, -0.243], [0.601, -0.522], [0, 0], [0, 0], [-0.186, -0.209], [0.048, -0.318], [0.242, -0.161], [0.43, 0.064], [0, 0], [0.264, 0.317], [-0.069, 0.455], [-0.07, 0.124], [-0.101, 0.103], [-0.176, 0.156]], o: [[0, 0], [0, 0], [-0.424, -0.064], [-0.187, -0.219], [0.047, -0.319], [0.245, -0.164], [0, 0], [1.011, 0.152], [-0.068, 0.45], [-0.208, 0.243], [0, 0], [0, 0], [0.431, 0.065], [0.185, 0.21], [-0.049, 0.331], [-0.241, 0.162], [0, 0], [-0.605, -0.091], [-0.265, -0.317], [0.023, -0.156], [0.07, -0.123], [0.102, -0.103], [0.177, -0.155]], v: [[-5.236, 2.854], [3.073, -4.518], [-2.98, -5.426], [-3.897, -5.85], [-4.108, -6.637], [-3.67, -7.361], [-2.667, -7.512], [5.135, -6.342], [6.439, -4.702], [6.025, -3.663], [4.81, -2.516], [-2.953, 4.335], [4.307, 5.424], [5.231, 5.835], [5.437, 6.628], [5.001, 7.365], [3.994, 7.512], [-4.912, 6.174], [-6.216, 5.563], [-6.511, 4.404], [-6.372, 3.984], [-6.116, 3.645], [-5.699, 3.258]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.29411764705882354, 0.29411764705882354, 0.29411764705882354, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [6.83, 7.826], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 4, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }], ip: -56, op: 40, st: -56, bm: 0 }, { ddd: 0, ind: 10, ty: 4, nm: "Layer 3 Outlines 2", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [218.329, 371.88, 0], ix: 2 }, a: { a: 0, k: [38.092, 69.509, 0], ix: 1 }, s: { a: 0, k: [243, 243, 100], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [3.938, 1.438], [0, 0], [-65.154, -9.354], [-9.609, 9.602], [7.273, -2.257], [31.437, 4.606], [0.57, 6.841]], o: [[0, 0], [-3.937, -1.437], [0, 0], [28.176, 4.045], [12.5, -12.49], [-7.25, 2.25], [-24.005, -3.517], [-0.5, -6]], v: [[-28, -24.676], [-28.625, -34.864], [-36.75, -28.176], [-3.971, 35.91], [50.916, 20.483], [44.387, 3.718], [-3.854, 14.749], [-31.25, -9.676]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.34509803921568627, 0.3764705882352941, 0.403921568627451, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [70.25, 99.176], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 11", np: 4, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }], ip: 0, op: 240, st: 0, bm: 0 }, { ddd: 0, ind: 12, ty: 4, nm: "Layer 3 Outlines 7", parent: 1, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [40.876, 14.559, 0], ix: 2 }, a: { a: 0, k: [102.906, 67.863, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [-1.698, 0.421], [0, 0]], o: [[0, 0], [1.764, -0.438], [0, 0]], v: [[-3.133, 0.437], [0.499, 0.216], [3.133, -0.637]], c: !1 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [1, 1, 1, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 2, ix: 5 }, lc: 2, lj: 2, bm: 0, nm: "Stroke 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "tr", p: { a: 0, k: [184.867, 70.508], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [-13.214, -7.897], [0, 0]], o: [[0, 0], [11.938, 7.135], [0, 0]], v: [[-28.406, -16.684], [4.344, -2.934], [28.406, 16.684]], c: !1 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [1, 1, 1, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 2, ix: 5 }, lc: 2, lj: 2, bm: 0, nm: "Stroke 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "tr", p: { a: 0, k: [159.052, 59.941], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 9", np: 2, cix: 2, bm: 0, ix: 2, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [8.75, 1.083], [0, 0], [4.898, 6.334], [0, 0]], o: [[0.167, -5.167], [-7.795, -0.965], [0, 0], [-6.821, -8.818], [0, 0]], v: [[29.067, 17.669], [10.232, 5.648], [-10.936, 6.316], [-15.769, -8.852], [-29.234, -16.523]], c: !1 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [1, 1, 1, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 2, ix: 5 }, lc: 2, lj: 2, bm: 0, nm: "Stroke 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "tr", p: { a: 0, k: [104.767, 43.334], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 10", np: 2, cix: 2, bm: 0, ix: 3, mn: "ADBE Vector Group", hd: !1 }], ip: 0, op: 240, st: 0, bm: 0 }, { ddd: 0, ind: 13, ty: 4, nm: "Layer 3 Outlines 6", parent: 1, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [40.876, 14.559, 0], ix: 2 }, a: { a: 0, k: [102.906, 67.863, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 1, k: [{ i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 0, s: [{ i: [[0, 0], [0, -2.136]], o: [[0, 0], [0, 0]], v: [[0.075, -2.136], [-0.074, 2.136]], c: !1 }] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 47, s: [{ i: [[0, 0], [0, -2.136]], o: [[0, 0], [0, 0]], v: [[-0.543, -6.868], [-1.103, 0.387]], c: !1 }] }, { t: 95, s: [{ i: [[0, 0], [0, -2.136]], o: [[0, 0], [0, 0]], v: [[0.075, -2.136], [-0.074, 2.136]], c: !1 }] }], ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [1, 1, 1, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 2, ix: 5 }, lc: 2, lj: 2, bm: 0, nm: "Stroke 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "tr", p: { a: 0, k: [140.2, 21.552], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }], ip: 0, op: 240, st: 0, bm: 0 }, { ddd: 0, ind: 14, ty: 4, nm: "Layer 3 Outlines 5", parent: 1, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] }, { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 47, s: [-12] }, { t: 95, s: [0] }], ix: 10 }, p: { a: 0, k: [127.06, 8.762, 0], ix: 2 }, a: { a: 0, k: [189.091, 62.066, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [-6.5, 0]], o: [[0, 0], [0, 0]], v: [[-5.25, -1.647], [5.25, 1.647]], c: !1 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [1, 1, 1, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 2, ix: 5 }, lc: 2, lj: 2, bm: 0, nm: "Stroke 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "tr", p: { a: 0, k: [194.625, 63.227], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [-4, 0.441]], o: [[0, 0], [0, 0]], v: [[-5.861, -0.417], [5.861, -0.024]], c: !1 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [1, 1, 1, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 2, ix: 5 }, lc: 2, lj: 2, bm: 0, nm: "Stroke 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "tr", p: { a: 0, k: [194.952, 59.676], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 2, cix: 2, bm: 0, ix: 2, mn: "ADBE Vector Group", hd: !1 }], ip: 0, op: 240, st: 0, bm: 0 }, { ddd: 0, ind: 15, ty: 4, nm: "Layer 3 Outlines 4", parent: 1, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 0, s: [40.876, 14.559, 0], to: [0, -0.652, 0], ti: [0, 0, 0] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 47, s: [40.876, 10.65, 0], to: [0, 0, 0], ti: [0, -0.652, 0] }, { t: 95, s: [40.876, 14.559, 0] }], ix: 2 }, a: { a: 0, k: [102.906, 67.863, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 1, k: [{ i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 0, s: [{ i: [[0, 0], [-1.167, -3.083], [1.883, -0.745]], o: [[0, 0], [-2.563, 0.453], [-0.698, -5.517]], v: [[-3.459, -5.517], [4.375, 3.566], [-3.677, 5.517]], c: !0 }] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 47, s: [{ i: [[0, 0], [-1.167, -3.083], [1.883, -0.745]], o: [[0, 0], [-2.563, 0.453], [-0.698, -5.517]], v: [[-3.459, -5.517], [4.889, 2.229], [-5.529, 4.18]], c: !0 }] }, { t: 95, s: [{ i: [[0, 0], [-1.167, -3.083], [1.883, -0.745]], o: [[0, 0], [-2.563, 0.453], [-0.698, -5.517]], v: [[-3.459, -5.517], [4.375, 3.566], [-3.677, 5.517]], c: !0 }] }], ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [1, 1, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [148.792, 13.35], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 4, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }], ip: 0, op: 240, st: 0, bm: 0 }, { ddd: 0, ind: 16, ty: 4, nm: "Layer 3 Outlines 3", parent: 1, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 0, s: [40.876, 14.559, 0], to: [0, -0.309, 0], ti: [0, 0, 0] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 47, s: [40.876, 12.708, 0], to: [0, 0, 0], ti: [0, -0.309, 0] }, { t: 95, s: [40.876, 14.559, 0] }], ix: 2 }, a: { a: 0, k: [102.906, 67.863, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [-4.5, -0.64], [-1.083, -3]], o: [[0, 0], [3.888, 0.552], [0, 0]], v: [[-8.042, -3.709], [-2.209, -1.568], [8.041, 3.709]], c: !1 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [1, 1, 1, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 2, ix: 5 }, lc: 2, lj: 2, bm: 0, nm: "Stroke 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "tr", p: { a: 0, k: [164.792, 45.791], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [-1.229, 0.584], [-0.75, 1.334]], o: [[0, 0], [1.449, -0.687], [0, 0]], v: [[-4.157, 1.531], [-2.509, 0.22], [4.157, -1.531]], c: !1 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [1, 1, 1, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 2, ix: 5 }, lc: 2, lj: 2, bm: 0, nm: "Stroke 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "tr", p: { a: 0, k: [188.925, 48.696], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 2, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[-0.473, 0.595], [0, -0.737], [0.291, 8e-3]], o: [[0.473, -0.595], [0, 0.736], [-0.292, -8e-3]], v: [[-2.464, -0.909], [2.937, -0.499], [0.202, 1.495]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [1, 1, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [180.408, 56.754], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 4, cix: 2, bm: 0, ix: 3, mn: "ADBE Vector Group", hd: !1 }], ip: 0, op: 240, st: 0, bm: 0 }, { ddd: 0, ind: 17, ty: 4, nm: "Layer 3 Outlines", parent: 1, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [48.326, -10.566, 0], ix: 2 }, a: { a: 0, k: [110.357, 42.738, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 1, k: [{ i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 0, s: [{ i: [[0, 0], [0.189, -2.649], [1.25, -0.708], [1.062, -2.083], [2.17, 1.33], [7.67, 3.66], [0, 0], [2.299, -1.611], [5.67, 0], [14.33, -6.66], [6.67, 3.66], [1.75, 6.5], [-23.25, 4.5], [0, 0], [-5.139, -0.73], [-0.67, -0.38], [-2.5, 0], [0, 0], [-2.25, -0.25], [0, 0], [-0.199, 0.669], [-2.27, -0.21], [-0.13, -7.47], [0.061, -0.56], [1.027, -3.367], [0, -3.26]], o: [[0, 0], [-0.125, 1.75], [0.333, 1.25], [-1.73, 2.841], [-2, -1.239], [-7.67, -3.67], [0, 0], [-3.661, 2.57], [-5.66, 0], [-23.34, 10.34], [-6.67, -3.67], [-5, -25.5], [23.25, -4.5], [0, 0], [3.221, 0.46], [0.08, -1.67], [2.5, 0], [0, 0], [2.25, 0.25], [0.13, -0.089], [0.971, -3.13], [2.54, 0.23], [0.01, 0.63], [6.782, 7.464], [-1.342, 4.396], [0, 5.802]], v: [[78.905, 26.786], [80.417, 31.214], [78.333, 34.339], [78.167, 39.401], [68.974, 41.04], [44.834, 26.051], [24.424, 18.381], [22.004, 22.711], [4.664, 21.051], [-26.997, 31.711], [-71.667, 34.051], [-82.917, 17.131], [-47.167, -37.87], [9.084, -25.62], [24.853, -25.139], [32.334, -23.37], [35.334, -41.62], [50.834, -27.87], [59.834, -28.12], [65.932, -27.671], [66.432, -28.859], [72.333, -39.87], [81.206, -20.717], [81.134, -18.918], [85.583, 4.631], [86.654, 16.14]], c: !0 }] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 47, s: [{ i: [[0, 0], [0.189, -2.649], [1.25, -0.708], [1.062, -2.083], [2.17, 1.33], [7.67, 3.66], [0, 0], [2.299, -1.611], [5.67, 0], [14.33, -6.66], [6.67, 3.66], [1.75, 6.5], [-23.25, 4.5], [0, 0], [-5.139, -0.73], [-0.67, -0.38], [-2.5, 0], [0, 0], [-2.25, -0.25], [0, 0], [-0.199, 0.669], [-2.27, -0.21], [-0.13, -7.47], [0.061, -0.56], [1.027, -3.367], [0, -3.26]], o: [[0, 0], [-0.125, 1.75], [0.333, 1.25], [-1.73, 2.841], [-2, -1.239], [-7.67, -3.67], [0, 0], [-3.661, 2.57], [-5.66, 0], [-23.34, 10.34], [-6.67, -3.67], [-5, -25.5], [23.25, -4.5], [0, 0], [3.221, 0.46], [0.08, -1.67], [2.5, 0], [0, 0], [2.25, 0.25], [0.13, -0.089], [0.971, -3.13], [2.54, 0.23], [0.01, 0.63], [6.782, 7.464], [-1.342, 4.396], [0, 5.802]], v: [[78.905, 26.786], [80.417, 31.214], [78.333, 34.339], [78.167, 39.401], [68.974, 41.04], [44.834, 26.051], [24.424, 18.381], [22.004, 22.711], [4.664, 21.051], [-26.997, 31.711], [-71.667, 34.051], [-82.917, 17.131], [-47.167, -37.87], [7.643, -31.175], [23.412, -30.695], [30.893, -28.925], [35.128, -44.294], [50.628, -30.544], [59.628, -30.794], [65.726, -30.345], [66.226, -31.534], [72.128, -42.544], [81, -23.392], [81.134, -18.917], [85.378, 1.956], [86.448, 13.466]], c: !0 }] }, { t: 95, s: [{ i: [[0, 0], [0.189, -2.649], [1.25, -0.708], [1.062, -2.083], [2.17, 1.33], [7.67, 3.66], [0, 0], [2.299, -1.611], [5.67, 0], [14.33, -6.66], [6.67, 3.66], [1.75, 6.5], [-23.25, 4.5], [0, 0], [-5.139, -0.73], [-0.67, -0.38], [-2.5, 0], [0, 0], [-2.25, -0.25], [0, 0], [-0.199, 0.669], [-2.27, -0.21], [-0.13, -7.47], [0.061, -0.56], [1.027, -3.367], [0, -3.26]], o: [[0, 0], [-0.125, 1.75], [0.333, 1.25], [-1.73, 2.841], [-2, -1.239], [-7.67, -3.67], [0, 0], [-3.661, 2.57], [-5.66, 0], [-23.34, 10.34], [-6.67, -3.67], [-5, -25.5], [23.25, -4.5], [0, 0], [3.221, 0.46], [0.08, -1.67], [2.5, 0], [0, 0], [2.25, 0.25], [0.13, -0.089], [0.971, -3.13], [2.54, 0.23], [0.01, 0.63], [6.782, 7.464], [-1.342, 4.396], [0, 5.802]], v: [[78.905, 26.786], [80.417, 31.214], [78.333, 34.339], [78.167, 39.401], [68.974, 41.04], [44.834, 26.051], [24.424, 18.381], [22.004, 22.711], [4.664, 21.051], [-26.997, 31.711], [-71.667, 34.051], [-82.917, 17.131], [-47.167, -37.87], [9.084, -25.62], [24.853, -25.139], [32.334, -23.37], [35.334, -41.62], [50.834, -27.87], [59.834, -28.12], [65.932, -27.671], [66.432, -28.859], [72.333, -39.87], [81.206, -20.717], [81.134, -18.918], [85.583, 4.631], [86.654, 16.14]], c: !0 }] }], ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.34509803921568627, 0.3764705882352941, 0.403921568627451, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [108.917, 42.62], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 12", np: 4, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }], ip: 0, op: 240, st: 0, bm: 0 }, { ddd: 0, ind: 18, ty: 4, nm: "Layer 2 Outlines", parent: 1, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [50.145, 86.718, 0], ix: 2 }, a: { a: 0, k: [103.915, 111.603, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [-0.033, -0.406]], o: [[0, 0], [0, 0]], v: [[-0.174, -1.453], [0.174, 1.453]], c: !1 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [0.803921568627451, 0.8196078431372549, 0.8313725490196079, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 7, ix: 5 }, lc: 2, lj: 2, bm: 0, nm: "Stroke 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "tr", p: { a: 0, k: [170.661, 122.783], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [-2.31, -22.025]], o: [[0, 0], [0, 0]], v: [[-4.306, -23.886], [4.306, 23.886]], c: !1 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [0.803921568627451, 0.8196078431372549, 0.8313725490196079, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 7, ix: 5 }, lc: 2, lj: 2, bm: 0, nm: "Stroke 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "tr", p: { a: 0, k: [164.875, 84.913], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 2, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, -10.148], [10.148, 0], [0, 10.148], [-10.148, 0]], o: [[0, 10.148], [-10.148, 0], [0, -10.148], [10.148, 0]], v: [[18.375, 0], [0, 18.375], [-18.375, 0], [0, -18.375]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.6823529411764706, 0.7098039215686275, 0.7333333333333333, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [103.914, 204.58], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 3", np: 4, cix: 2, bm: 0, ix: 3, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[-1.409, -0.32], [0, 0], [0, 0], [0, 0], [-1.51, 0]], o: [[0, 0], [0, 0], [0, 0], [1.41, -0.32], [1.5, 0]], v: [[4.375, -3.655], [4.375, 4.145], [-4.375, 4.145], [-4.375, -3.655], [5e-3, -4.145]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.34509803921568627, 0.3764705882352941, 0.403921568627451, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [103.914, 188.56], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 4", np: 4, cix: 2, bm: 0, ix: 4, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[-1.47, 0], [0, 0], [3.75, 0], [0, 0], [0, 0], [-1.45, 0]], o: [[0, 0], [0, 0], [-3.75, 0], [0, 0], [1.47, 0], [1.45, 0]], v: [[4.375, -2.495], [4.375, 2.505], [0.075, 1.328], [-4.375, 2.505], [-4.375, -2.495], [5e-3, -2.505]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.34509803921568627, 0.3764705882352941, 0.403921568627451, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [103.914, 179.085], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 5", np: 4, cix: 2, bm: 0, ix: 5, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[-1.47, 0], [0, 0], [0, 0], [0, 0], [-1.45, 0]], o: [[0, 0], [0, 0], [0, 0], [1.47, 0], [1.45, 0]], v: [[4.375, -8.24], [4.375, 8.25], [-4.375, 8.25], [-4.375, -8.24], [5e-3, -8.25]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.6823529411764706, 0.7098039215686275, 0.7333333333333333, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [103.914, 184.83], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 6", np: 4, cix: 2, bm: 0, ix: 6, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [67.667, 0], [0, 0]], o: [[0, 0], [-67.667, 0], [0, 0]], v: [[92.819, 5.881], [0, -5.881], [-92.819, 5.881]], c: !1 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [0.34509803921568627, 0.3764705882352941, 0.403921568627451, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 2, ix: 5 }, lc: 2, lj: 2, bm: 0, nm: "Stroke 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "tr", p: { a: 0, k: [103.914, 147.128], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 7", np: 2, cix: 2, bm: 0, ix: 7, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, -6.92], [24.27, -2.26], [8.17, 0], [22.21, 2.07], [0, 4.96], [-40.53, 0.31], [-1.45, 0], [-1.47, 0]], o: [[0, 4.96], [-22.21, 2.07], [-8.18, 0], [-24.27, -2.26], [0, -6.92], [1.47, 0], [1.45, 0], [40.52, 0.31]], v: [[93.165, -0.86], [53.105, 9.93], [5e-3, 12.53], [-53.105, 9.93], [-93.165, -0.86], [-4.375, -12.52], [5e-3, -12.53], [4.375, -12.52]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.34509803921568627, 0.3764705882352941, 0.403921568627451, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [103.914, 189.11], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 8", np: 4, cix: 2, bm: 0, ix: 8, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[1.66, -2.5], [60.791, -1.939], [7.03, 0], [6.171, 0.201], [1.51, 2.27], [-1, 3], [0, 0], [-11.831, 37.08], [-21.5, 0], [-18.519, -58.04], [0, 0], [-1, -3]], o: [[-1.52, 2.27], [-6.16, 0.201], [-7.03, 0], [-60.79, -1.939], [-1.669, -2.5], [1, -3], [0, 0], [18.52, -58.04], [21.5, 0], [11.84, 37.08], [0, 0], [1, 3]], v: [[102.005, 86.995], [19.775, 101.854], [5e-3, 102.165], [-19.775, 101.854], [-101.995, 86.995], [-101.995, 59.665], [-96.495, 51.665], [-76.664, -39.165], [5e-3, -102.165], [76.664, -39.165], [96.505, 51.665], [102.005, 59.665]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.6823529411764706, 0.7098039215686275, 0.7333333333333333, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [103.915, 102.415], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 9", np: 4, cix: 2, bm: 0, ix: 9, mn: "ADBE Vector Group", hd: !1 }], ip: 0, op: 240, st: 0, bm: 0 }], markers = [], no_meeting_default = { v, fr, ip, op, w, h, nm, ddd, assets, layers, markers };

// app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx
var import_lottie_react = require("lottie-react");

// app/components/participants.tsx
var import_react9 = require("react"), import_jsx_dev_runtime5 = require("react/jsx-dev-runtime"), Participants = ({ meeting }) => {
  let [partcipants, setParticipants] = (0, import_react9.useState)([]), [loading, setLoading] = (0, import_react9.useState)(!0);
  return (0, import_react9.useEffect)(() => {
    if (!meeting)
      return;
    (async () => {
      setLoading(!0);
      var data = new FormData();
      data.append("requestType", JSON.stringify("getParticipantsForMeeting")), data.append("guildId", JSON.stringify(meeting.guildId)), data.append("channelId", JSON.stringify(meeting.channelId)), data.append("meetingId", JSON.stringify(meeting.id)), await fetch("/api", {
        method: "POST",
        body: data
      }).then((res) => res.json()).then((data2) => {
        setParticipants(data2), setLoading(!1);
      }).catch((e) => {
        console.log(e.message), setLoading(!1);
      });
    })();
  }, [meeting.id]), /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_jsx_dev_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h1", { className: "text-xl font-bold", children: "Participants" }, void 0, !1, {
      fileName: "app/components/participants.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("ul", { className: "list-disc ml-5", children: meeting === void 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { children: "Failed to load meeting details." }, void 0, !1, {
      fileName: "app/components/participants.tsx",
      lineNumber: 45,
      columnNumber: 11
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_jsx_dev_runtime5.Fragment, { children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { children: "Loading..." }, void 0, !1, {
      fileName: "app/components/participants.tsx",
      lineNumber: 49,
      columnNumber: 15
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_jsx_dev_runtime5.Fragment, { children: partcipants.map((participant, id) => /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { children: participant.slice(0, -5) }, id, !1, {
      fileName: "app/components/participants.tsx",
      lineNumber: 53,
      columnNumber: 19
    }, this)) }, void 0, !1, {
      fileName: "app/components/participants.tsx",
      lineNumber: 51,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/components/participants.tsx",
      lineNumber: 47,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/participants.tsx",
      lineNumber: 43,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/participants.tsx",
    lineNumber: 41,
    columnNumber: 5
  }, this);
};

// app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), loader2 = () => (0, import_node4.json)({
  openai_key: process.env.OPENAI_API_KEY,
  supabaseKey: process.env.SUPABASE_KEY
}), action = async ({ request }) => {
  var _a, _b, _c, _d, _e;
  let supabase = createSupabaseClient(process.env.SUPABASE_KEY), data = await request.formData(), inputFields = JSON.parse(((_a = data.get("inputFields")) == null ? void 0 : _a.toString()) || "[]"), guildId = JSON.parse(((_b = data.get("guildId")) == null ? void 0 : _b.toString()) || "{}"), channelId = JSON.parse(((_c = data.get("channelId")) == null ? void 0 : _c.toString()) || "{}"), meetingId = JSON.parse(((_d = data.get("meetingId")) == null ? void 0 : _d.toString()) || "{}"), userId = JSON.parse(((_e = data.get("userId")) == null ? void 0 : _e.toString()) || "{}");
  return await supabase.saveProcessedTranscripts(
    guildId,
    channelId,
    meetingId,
    process.env.S3_BUCKET_REGION,
    process.env.S3_BUCKET_NAME
  ), fetch("https://url770sa6k.execute-api.us-west-2.amazonaws.com/dev/insight", {
    method: "POST",
    body: JSON.stringify({
      sections: inputFields,
      guildId,
      channelId,
      meetingId,
      userId
    })
  }).catch((err) => console.log(err)), null;
};
function MeetingPage() {
  var _a, _b;
  let { supabaseKey } = (0, import_react10.useLoaderData)(), meetings = useRouteData("routes/dashboard.guilds.$guild") || [], user = (_a = useRouteData("root")) == null ? void 0 : _a.user, meetingId = (_b = useRouteParam("routes/dashboard", "meeting")) == null ? void 0 : _b.split(
    "-"
  )[1], thisMeeting = meetings.find((meeting) => meeting.id === meetingId), [insights, setInsights] = (0, import_react11.useState)([]), [loadingInsights, setLoadingInsights] = (0, import_react11.useState)(!1), [pendingJob, setPendingJob] = (0, import_react11.useState)(!1), [supabase] = (0, import_react11.useState)(() => createSupabaseClient(supabaseKey)), supabaseClient = supabase.getClient(), fetchInsights = async () => {
    setLoadingInsights(!0);
    let retrievedInsights = await supabase.getInsights(thisMeeting.id);
    setInsights(retrievedInsights), setLoadingInsights(!1);
  };
  return (0, import_react11.useEffect)(() => {
    let channel = supabaseClient.channel(`${user.id}-insights-update`).on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "insights",
        filter: `meeting_id=eq.${meetingId}`
      },
      () => {
        fetchInsights(), setPendingJob(!1);
      }
    ).on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "insights",
        filter: `meeting_id=eq.${meetingId}`
      },
      () => {
        setPendingJob(!0);
      }
    ).subscribe((message) => {
      console.log(message);
    });
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []), useInsightArrayEffect(() => {
    fetchInsights();
  }, [insights, thisMeeting.id]), /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "p-10 min-h-screen whitespace-pre-line  max-w-4xl", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h1", { className: "text-3xl font-bold flex items-center", children: [
      "Insight",
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "ml-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
        GenerateInsight,
        {
          meeting: thisMeeting,
          supabaseKey,
          user,
          fetchInsights
        },
        void 0,
        !1,
        {
          fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
          lineNumber: 145,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
        lineNumber: 144,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "ml-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "bg-gray-500 hover:bg-gray-700 text-white font-bold p-1 rounded-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
        import_react10.Link,
        {
          to: `/transcript/${thisMeeting == null ? void 0 : thisMeeting.guildId}-${thisMeeting == null ? void 0 : thisMeeting.channelId}-${thisMeeting == null ? void 0 : thisMeeting.id}`,
          target: "_blank",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_outline2.DocumentTextIcon, { className: "text-white stroke-2 h-5 w-5" }, void 0, !1, {
            fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
            lineNumber: 158,
            columnNumber: 15
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
          lineNumber: 154,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
        lineNumber: 153,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
      lineNumber: 142,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "mt-10", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Participants, { meeting: thisMeeting }, void 0, !1, {
        fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
        lineNumber: 165,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "border-b-2 border-gray-200 " }, void 0, !1, {
        fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
        lineNumber: 167,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h1", { className: "text-xl font-bold mt-10", children: "Insights" }, void 0, !1, {
        fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
        lineNumber: 168,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "text-gray-500 text-sm mt-2", children: pendingJob && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("ul", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { children: "\u2714\uFE0F processed all transcripts" }, void 0, !1, {
          fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
          lineNumber: 172,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { className: "animate-pulse", children: "\u23F3 generating insights (this might take minutes if it's a large meeting. time to grab a coffee!)" }, void 0, !1, {
          fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
          lineNumber: 174,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
        lineNumber: 171,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
        lineNumber: 169,
        columnNumber: 9
      }, this),
      loadingInsights ? /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "mt-5", children: "Loading..." }, void 0, !1, {
        fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
        lineNumber: 182,
        columnNumber: 11
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Collapsible, { insights }, void 0, !1, {
        fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
        lineNumber: 184,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
      lineNumber: 164,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
    lineNumber: 141,
    columnNumber: 5
  }, this);
}
function Collapsible({ insights }) {
  let options = {
    animationData: no_meeting_exports,
    loop: !0
  }, { View } = (0, import_lottie_react.useLottie)(options);
  return insights.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex flex-col items-center h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "w-40 h-40", children: View }, void 0, !1, {
      fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
      lineNumber: 201,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "text-md font-bold text-gray-600 mt-5", children: "No insights generated yet" }, void 0, !1, {
      fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
      lineNumber: 202,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
    lineNumber: 200,
    columnNumber: 7
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "mt-5", children: insights.map((insight, id) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(CollapsibleItem, { insight }, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
    lineNumber: 212,
    columnNumber: 11
  }, this) }, id, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
    lineNumber: 211,
    columnNumber: 9
  }, this)) }, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
    lineNumber: 209,
    columnNumber: 5
  }, this);
}
function CollapsibleItem({ insight }) {
  let [isOpen, setIsOpen] = (0, import_react11.useState)(!1);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "border-b-2 border-gray-200", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h1", { className: "text-lg font-bold", children: [
        "Generated by ",
        insight.displayName,
        " -",
        " ",
        convertUNIXToString(String(Date.parse(insight.created_at)))
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
        lineNumber: 224,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
        "button",
        {
          onClick: () => setIsOpen(!isOpen),
          className: "bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded-full",
          children: isOpen ? "Hide" : "Show"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
          lineNumber: 228,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
      lineNumber: 223,
      columnNumber: 7
    }, this),
    isOpen && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "mt-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react_markdown.default, { children: insight.text }, void 0, !1, {
      fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
      lineNumber: 237,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
      lineNumber: 236,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.guilds.$guild.meetings.$meeting.tsx",
    lineNumber: 222,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard.guilds.$guild.meetings._index.tsx
var dashboard_guilds_guild_meetings_index_exports = {};
__export(dashboard_guilds_guild_meetings_index_exports, {
  default: () => MeetingsIndex
});
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime");
function MeetingsIndex() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h1", { children: "Pick a meeting" }, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.meetings._index.tsx",
    lineNumber: 4,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.meetings._index.tsx",
    lineNumber: 3,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard.guilds.$guild.tsx
var dashboard_guilds_guild_exports = {};
__export(dashboard_guilds_guild_exports, {
  default: () => GuildPage,
  loader: () => loader3
});
var import_react13 = require("@remix-run/react"), import_react14 = require("react");

// app/assets/lottie/magic-cube.gif
var magic_cube_default = "/build/_assets/magic-cube-GMTWTWPZ.gif";

// app/routes/dashboard.guilds.$guild.tsx
var import_lottie_react2 = require("lottie-react");

// app/context/selectedMeetingContext.tsx
var import_react12 = require("react"), import_jsx_dev_runtime8 = require("react/jsx-dev-runtime"), SelectedMeetingContext = (0, import_react12.createContext)(null), SelectedMeetingProvider = ({ children }) => {
  let [selectedMeetingId, setSelectedMeetingId] = (0, import_react12.useState)(void 0), [selectedCardId, setSelectedCardId] = (0, import_react12.useState)(0);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
    SelectedMeetingContext.Provider,
    {
      value: {
        selectedMeetingId,
        selectedCardId,
        setSelectedMeetingId,
        setSelectedCardId
      },
      children
    },
    void 0,
    !1,
    {
      fileName: "app/context/selectedMeetingContext.tsx",
      lineNumber: 26,
      columnNumber: 5
    },
    this
  );
}, selectedMeetingContext_default = SelectedMeetingProvider;

// app/routes/dashboard.guilds.$guild.tsx
var import_jsx_dev_runtime9 = require("react/jsx-dev-runtime"), loader3 = async ({ request }) => {
  let regexPattern = /\/guilds\/(\d+)/, match = request.url.match(regexPattern), guildId = match ? match[1] : null;
  return await getMeetings(
    guildId || "",
    process.env.S3_BUCKET_REGION,
    process.env.S3_BUCKET_NAME
  );
};
function GuildPage() {
  var _a;
  let meetings = (0, import_react13.useLoaderData)(), guilds = ((_a = useRouteData("routes/dashboard")) == null ? void 0 : _a.guilds) || [], guildId = useRouteParam("routes/dashboard", "guild");
  useMeetingArrayEffect(() => {
  }, meetings);
  let {
    selectedCardId,
    setSelectedCardId,
    selectedMeetingId,
    setSelectedMeetingId
  } = (0, import_react14.useContext)(SelectedMeetingContext), guild = guilds.find((guild2) => guild2.id === guildId), meetings_grouped_by_date = meetings.reduce((acc, meeting) => {
    let date = convertUNIXToString(meeting.id, "%B %d, %Y");
    return acc[date] || (acc[date] = []), acc[date].push(meeting), acc;
  }, {}), sorted_meetings = Object.keys(meetings_grouped_by_date).sort((a, b) => Date.parse(b) - Date.parse(a));
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, { children: guild && guild.hasHearHearBot ? /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, { children: sorted_meetings.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(NoMeetingPage, {}, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.tsx",
    lineNumber: 70,
    columnNumber: 15
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.tsx",
    lineNumber: 69,
    columnNumber: 13
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex-auto max-w-md border-r-2 border-gray-200 p-10 min-h-screen", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h1", { className: "text-3xl font-bold", children: "Meetings" }, void 0, !1, {
        fileName: "app/routes/dashboard.guilds.$guild.tsx",
        lineNumber: 76,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "mt-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("ul", { children: sorted_meetings.map((date, id) => /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
        "li",
        {
          className: "flex-col flex items-center justify-center mb-5",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
              "div",
              {
                className: `bg-slate-100 rounded-lg shadow-lg p-4 cursor-pointer ${selectedCardId === id ? `min-h-[7rem] text-white ${selectedCardId === id ? "bg-gradient-to-b from-green-400 to-blue-500" : ""}` : "border-solid border-gray-100 border-2"} min-w-full`,
                onClick: () => setSelectedCardId(
                  selectedCardId === id ? -1 : id
                ),
                children: selectedCardId !== id && /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "font-semibold", children: date }, void 0, !1, {
                  fileName: "app/routes/dashboard.guilds.$guild.tsx",
                  lineNumber: 103,
                  columnNumber: 35
                }, this) }, void 0, !1, {
                  fileName: "app/routes/dashboard.guilds.$guild.tsx",
                  lineNumber: 102,
                  columnNumber: 33
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/routes/dashboard.guilds.$guild.tsx",
                lineNumber: 89,
                columnNumber: 29
              },
              this
            ),
            selectedCardId === id && /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
              "div",
              {
                className: `mt-[-3rem] backdrop-blur-sm
                          bg-white/30 p-4 w-[90%] shadow-lg 
                          rounded-lg border-solid border-gray-50 border-1`,
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex flex-col space-y-4", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "font-semibold mb-5", children: date }, void 0, !1, {
                    fileName: "app/routes/dashboard.guilds.$guild.tsx",
                    lineNumber: 116,
                    columnNumber: 35
                  }, this),
                  meetings_grouped_by_date[date].sort(
                    (a, b) => Number(b.id) - Number(a.id)
                  ).map((meeting) => /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
                    "div",
                    {
                      className: "flex items-center",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "h-2 w-2 rounded-full bg-gray-500" }, void 0, !1, {
                          fileName: "app/routes/dashboard.guilds.$guild.tsx",
                          lineNumber: 129,
                          columnNumber: 41
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
                          import_react13.NavLink,
                          {
                            prefetch: "intent",
                            to: `/dashboard/guilds/${guildId}/meetings/${meeting.channelId}-${meeting.id}`,
                            className: "flex items-center justify-between w-full",
                            onClick: () => setSelectedMeetingId(meeting.id),
                            children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
                              "div",
                              {
                                className: `ml-4 bg-white shadow-md w-full
                                   p-3 rounded-lg hover:bg-gray-100 ${selectedMeetingId === meeting.id ? "border-solid border-green-500 border-2" : ""} `,
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: meeting.channelName }, void 0, !1, {
                                    fileName: "app/routes/dashboard.guilds.$guild.tsx",
                                    lineNumber: 146,
                                    columnNumber: 45
                                  }, this),
                                  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "text-gray-500", children: [
                                    convertUNIXToString(
                                      meeting.startTime,
                                      "%I:%M %p"
                                    ),
                                    " ",
                                    "-",
                                    " ",
                                    convertUNIXToString(
                                      meeting.endTime,
                                      "%I:%M %p"
                                    )
                                  ] }, void 0, !0, {
                                    fileName: "app/routes/dashboard.guilds.$guild.tsx",
                                    lineNumber: 147,
                                    columnNumber: 45
                                  }, this)
                                ]
                              },
                              void 0,
                              !0,
                              {
                                fileName: "app/routes/dashboard.guilds.$guild.tsx",
                                lineNumber: 138,
                                columnNumber: 43
                              },
                              this
                            )
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/dashboard.guilds.$guild.tsx",
                            lineNumber: 130,
                            columnNumber: 41
                          },
                          this
                        )
                      ]
                    },
                    meeting.id,
                    !0,
                    {
                      fileName: "app/routes/dashboard.guilds.$guild.tsx",
                      lineNumber: 125,
                      columnNumber: 39
                    },
                    this
                  ))
                ] }, void 0, !0, {
                  fileName: "app/routes/dashboard.guilds.$guild.tsx",
                  lineNumber: 115,
                  columnNumber: 33
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/routes/dashboard.guilds.$guild.tsx",
                lineNumber: 110,
                columnNumber: 31
              },
              this
            )
          ]
        },
        date,
        !0,
        {
          fileName: "app/routes/dashboard.guilds.$guild.tsx",
          lineNumber: 85,
          columnNumber: 27
        },
        this
      )) }, void 0, !1, {
        fileName: "app/routes/dashboard.guilds.$guild.tsx",
        lineNumber: 78,
        columnNumber: 21
      }, this) }, void 0, !1, {
        fileName: "app/routes/dashboard.guilds.$guild.tsx",
        lineNumber: 77,
        columnNumber: 19
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.guilds.$guild.tsx",
      lineNumber: 75,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex-auto max-h-screen w-1/3 overflow-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_react13.Outlet, {}, void 0, !1, {
      fileName: "app/routes/dashboard.guilds.$guild.tsx",
      lineNumber: 173,
      columnNumber: 19
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard.guilds.$guild.tsx",
      lineNumber: 172,
      columnNumber: 17
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.guilds.$guild.tsx",
    lineNumber: 74,
    columnNumber: 15
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.tsx",
    lineNumber: 73,
    columnNumber: 13
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.tsx",
    lineNumber: 67,
    columnNumber: 9
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, { children: guild ? /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(MagicBotInvite, { guild }, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.tsx",
    lineNumber: 182,
    columnNumber: 13
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex flex-col items-center h-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h1", { className: "text-3xl font-bold mb-0 mt-10", children: "something went wrong when getting server info." }, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.tsx",
    lineNumber: 185,
    columnNumber: 15
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.tsx",
    lineNumber: 184,
    columnNumber: 13
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.tsx",
    lineNumber: 180,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.tsx",
    lineNumber: 65,
    columnNumber: 5
  }, this);
}
function NoMeetingPage() {
  let options = {
    animationData: no_meeting_exports,
    loop: !0
  }, { View } = (0, import_lottie_react2.useLottie)(options);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex flex-col items-center h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "w-96 h-96", children: View }, void 0, !1, {
      fileName: "app/routes/dashboard.guilds.$guild.tsx",
      lineNumber: 207,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h1", { className: "text-3xl font-bold mb-0 mt-10", children: "nothing yet..." }, void 0, !1, {
      fileName: "app/routes/dashboard.guilds.$guild.tsx",
      lineNumber: 208,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-gray-500 text-sm mt-5", children: "try schedule some meetings with the HearHear bot... or take a nap" }, void 0, !1, {
      fileName: "app/routes/dashboard.guilds.$guild.tsx",
      lineNumber: 209,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.guilds.$guild.tsx",
    lineNumber: 206,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.tsx",
    lineNumber: 205,
    columnNumber: 5
  }, this);
}
function MagicBotInvite({ guild }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex flex-col items-center h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
      "img",
      {
        src: magic_cube_default,
        alt: "Magic Cube",
        className: "w-96 h-96 mt-10"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/dashboard.guilds.$guild.tsx",
        lineNumber: 221,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h1", { className: "text-3xl font-bold mb-0 mt-[-2.5rem]", children: "let the magic happen" }, void 0, !1, {
      fileName: "app/routes/dashboard.guilds.$guild.tsx",
      lineNumber: 226,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
      "button",
      {
        className: "bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-5",
        onClick: () => {
          window.open(
            `https://discord.com/api/oauth2/authorize?client_id=1094729151514161204&permissions=380139210752&scope=applications.commands%20bot&guild_id=${guild.id}`,
            "popup",
            "width=600,height=600"
          );
        },
        children: "\u2728 Invite HearHear Bot \u2728"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/dashboard.guilds.$guild.tsx",
        lineNumber: 229,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-gray-500 text-sm mt-5", children: "refresh this page after you've added the bot" }, void 0, !1, {
      fileName: "app/routes/dashboard.guilds.$guild.tsx",
      lineNumber: 241,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.guilds.$guild.tsx",
    lineNumber: 220,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard.guilds.$guild.tsx",
    lineNumber: 219,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard.guilds._index.tsx
var dashboard_guilds_index_exports = {};
__export(dashboard_guilds_index_exports, {
  default: () => Index,
  loader: () => loader4
});
var import_node5 = require("@remix-run/node"), import_jsx_dev_runtime10 = require("react/jsx-dev-runtime");
function loader4() {
  return (0, import_node5.redirect)("/dashboard");
}
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h1", { children: "Guild" }, void 0, !1, {
      fileName: "app/routes/dashboard.guilds._index.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { children: "You are not supposed to see this one. If you are seeing this, congrats! You've broke my code." }, void 0, !1, {
      fileName: "app/routes/dashboard.guilds._index.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.guilds._index.tsx",
    lineNumber: 9,
    columnNumber: 5
  }, this);
}

// app/routes/transcript.$transcript.tsx
var transcript_transcript_exports = {};
__export(transcript_transcript_exports, {
  action: () => action2,
  default: () => TranscriptPage,
  loader: () => loader5
});
var import_node6 = require("@remix-run/node"), import_react15 = require("@remix-run/react"), import_react16 = require("react");
var import_solid2 = require("@heroicons/react/24/solid");
var import_jsx_dev_runtime11 = require("react/jsx-dev-runtime"), loader5 = async ({ request }) => {
  let match = request.url.split("/").pop().split("-"), guildId = match[0], channelId = match[1], meetingId = match[2], user = await auth.isAuthenticated(request, {
    failureRedirect: "/login"
  });
  return (user.guilds ? user.guilds.map((guild) => guild.id) : []).includes(guildId) ? {
    transcripts: await getTranscripts(
      guildId,
      channelId,
      meetingId,
      process.env.S3_BUCKET_REGION,
      process.env.S3_BUCKET_NAME,
      process.env.AWS_ACCESS_KEY_ID,
      process.env.AWS_SECRET_ACCESS_KEY
    ),
    guildId,
    channelId,
    meetingId
  } : "Unauthorized";
}, action2 = async ({ request }) => {
  var _a;
  let match = request.url.split("/").pop().split("-"), data = await request.formData(), requestType = JSON.parse(((_a = data.get("requestType")) == null ? void 0 : _a.toString()) || ""), guildId = match[0], channelId = match[1], meetingId = match[2];
  await auth.isAuthenticated(request, {
    failureRedirect: "/login"
  });
  let json4 = await (await fetch("https://worker.xipu-li5458.workers.dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      requestType,
      guildId,
      channelId,
      meetingId
    })
  })).json();
  return console.log(json4), new import_node6.Response(JSON.stringify(json4), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
function TranscriptPage() {
  let authorization = (0, import_react15.useLoaderData)(), { transcripts, guildId, channelId, meetingId } = (0, import_react15.useLoaderData)(), [currentTranscriptId, setCurrentTranscriptId] = (0, import_react16.useState)(
    null
  ), [downloadingRecordings, setDownloadingRecordings] = (0, import_react16.useState)(!1);
  if (authorization === "Unauthorized")
    return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex flex-col items-center justify-center h-screen", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("h1", { className: "text-3xl font-bold", children: "You do not have permission to view this page." }, void 0, !1, {
      fileName: "app/routes/transcript.$transcript.tsx",
      lineNumber: 105,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/transcript.$transcript.tsx",
      lineNumber: 104,
      columnNumber: 7
    }, this);
  if (transcripts === null)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex flex-col items-center justify-center h-screen", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("h1", { className: "text-3xl font-bold", children: "No transcripts found" }, void 0, !1, {
      fileName: "app/routes/transcript.$transcript.tsx",
      lineNumber: 115,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/transcript.$transcript.tsx",
      lineNumber: 114,
      columnNumber: 7
    }, this);
  async function handleDownload() {
    setDownloadingRecordings(!0);
    let formData = new FormData();
    formData.append("requestType", JSON.stringify("getTranscriptForMeeting")), await fetch(`/transcript/${guildId}-${channelId}-${meetingId}`, {
      method: "POST",
      body: formData
    }).then((res) => res.json()).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    }), setDownloadingRecordings(!1);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "mt-5 p-5 mx-auto", children: transcripts.sort(
    (a, b) => Number(a.filename.split("-")[0]) - Number(b.filename.split("-")[0])
  ).map((transcript, id) => /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "border-b py-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("h2", { className: "text-xl font-semibold mb-0 flex items-center", children: [
      transcript.filename.split("-")[1].slice(0, -4),
      " -",
      " ",
      convertUNIXToString(
        transcript.filename.split("-")[0],
        "%I:%M:%S %p"
      ),
      currentTranscriptId === id && /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", { className: "ml-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_solid2.SpeakerWaveIcon, { className: "text-gray-500 stroke-2 h-5 w-5" }, void 0, !1, {
        fileName: "app/routes/transcript.$transcript.tsx",
        lineNumber: 187,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "app/routes/transcript.$transcript.tsx",
        lineNumber: 186,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/transcript.$transcript.tsx",
      lineNumber: 179,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
      "div",
      {
        className: "p-4 mb-5 text-gray-600 text-lg",
        children: transcript.text
      },
      void 0,
      !1,
      {
        fileName: "app/routes/transcript.$transcript.tsx",
        lineNumber: 192,
        columnNumber: 13
      },
      this
    )
  ] }, id, !0, {
    fileName: "app/routes/transcript.$transcript.tsx",
    lineNumber: 168,
    columnNumber: 11
  }, this)) }, void 0, !1, {
    fileName: "app/routes/transcript.$transcript.tsx",
    lineNumber: 152,
    columnNumber: 5
  }, this);
}

// app/routes/auth.discord.callback.tsx
var auth_discord_callback_exports = {};
__export(auth_discord_callback_exports, {
  loader: () => loader6
});
var loader6 = ({ request }) => auth.authenticate("discord", request, {
  successRedirect: "/dashboard",
  failureRedirect: "/login"
});

// app/routes/auth.discord.logout.tsx
var auth_discord_logout_exports = {};
__export(auth_discord_logout_exports, {
  action: () => action3,
  loader: () => loader7
});
var import_node7 = require("@remix-run/node");
var loader7 = () => (0, import_node7.redirect)("/"), action3 = ({ request }) => auth.logout(request, {
  redirectTo: "/"
});

// app/routes/transcript._index.tsx
var transcript_index_exports = {};
__export(transcript_index_exports, {
  default: () => Index2,
  loader: () => loader8
});
var import_node8 = require("@remix-run/node"), import_jsx_dev_runtime12 = require("react/jsx-dev-runtime");
function loader8() {
  return (0, import_node8.redirect)("/dashboard");
}
function Index2() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h1", { children: "Guild" }, void 0, !1, {
      fileName: "app/routes/transcript._index.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { children: "You are not supposed to see this one. If you are seeing this, congrats! You've broke my code." }, void 0, !1, {
      fileName: "app/routes/transcript._index.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/transcript._index.tsx",
    lineNumber: 9,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard._index.tsx
var dashboard_index_exports = {};
__export(dashboard_index_exports, {
  StackedAvatar: () => StackedAvatar,
  default: () => DashboardIndex
});

// app/assets/lottie/no-server-selected.json
var no_server_selected_exports = {};
__export(no_server_selected_exports, {
  assets: () => assets2,
  ddd: () => ddd2,
  default: () => no_server_selected_default,
  fr: () => fr2,
  h: () => h2,
  ip: () => ip2,
  layers: () => layers2,
  markers: () => markers2,
  meta: () => meta,
  nm: () => nm2,
  op: () => op2,
  v: () => v2,
  w: () => w2
});
var v2 = "4.8.0", meta = { g: "LottieFiles AE 3.0.2", a: "", k: "", d: "", tc: "none" }, fr2 = 30, ip2 = 0, op2 = 166, w2 = 600, h2 = 600, nm2 = "fantoma", ddd2 = 0, assets2 = [{ id: "comp_0", layers: [{ ddd: 0, ind: 1, ty: 4, nm: "pupile Outlines", parent: 4, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 18, s: [285.25, 300, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 36, s: [285.716, 300, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 45, s: [285.25, 300, 0], to: [6, 0, 0], ti: [-6, 0, 0] }, { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 47.5, s: [321.25, 300, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 120, s: [321.25, 300, 0], to: [-6, 0, 0], ti: [6, 0, 0] }, { t: 123, s: [285.25, 300, 0] }], ix: 2 }, a: { a: 0, k: [300, 300, 0], ix: 1 }, s: { a: 1, k: [{ i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 18, s: [100, 100, 100] }, { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 20, s: [100, 0, 100] }, { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 22, s: [100, 100, 100] }, { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 105, s: [100, 100, 100] }, { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 107, s: [100, 0, 100] }, { t: 109, s: [100, 100, 100] }], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 4.076], [4.076, 0], [0, -4.076], [-4.076, 0]], o: [[0, -4.076], [-4.076, 0], [0, 4.076], [4.076, 0]], v: [[7.381, 0], [0, -7.381], [-7.381, 0], [0, 7.381]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.43529411764705883, 0.43529411764705883, 0.43529411764705883, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [321.848, 268.202], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 4.076], [4.076, 0], [0, -4.076], [-4.076, 0]], o: [[0, -4.076], [-4.076, 0], [0, 4.076], [4.076, 0]], v: [[7.381, 0], [0, -7.381], [-7.381, 0], [0, 7.381]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.43529411764705883, 0.43529411764705883, 0.43529411764705883, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [271.206, 268.202], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 2, cix: 2, bm: 0, ix: 2, mn: "ADBE Vector Group", hd: !1 }], ip: 0, op: 166, st: 0, bm: 0 }, { ddd: 0, ind: 2, ty: 4, nm: "ochi Outlines", parent: 4, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 45, s: [300, 300, 0], to: [3.75, 0, 0], ti: [-3.75, 0, 0] }, { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 47.5, s: [322.5, 300, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { i: { x: 0.833, y: 0.8 }, o: { x: 0.167, y: 0.167 }, t: 120, s: [322.5, 300, 0], to: [-3.75, 0, 0], ti: [3.75, 0, 0] }, { t: 123, s: [300, 300, 0] }], ix: 2 }, a: { a: 0, k: [300, 300, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 10.987], [10.987, 0], [0, -10.987], [-10.987, 0]], o: [[0, -10.987], [-10.987, 0], [0, 10.987], [10.987, 0]], v: [[19.893, 0], [-1e-3, -19.894], [-19.894, 0], [-1e-3, 19.894]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [0.43529411764705883, 0.43529411764705883, 0.43529411764705883, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 4, ix: 5 }, lc: 1, lj: 1, ml: 10, bm: 0, nm: "Stroke 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.945098099054, 0.949019667682, 0.949019667682, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [314.467, 268.202], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }, { ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 10.987], [10.987, 0], [0, -10.987], [-10.987, 0]], o: [[0, -10.987], [-10.987, 0], [0, 10.987], [10.987, 0]], v: [[19.893, 0], [-1e-3, -19.894], [-19.894, 0], [-1e-3, 19.894]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [0.43529411764705883, 0.43529411764705883, 0.43529411764705883, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 4, ix: 5 }, lc: 1, lj: 1, ml: 10, bm: 0, nm: "Stroke 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.945098099054, 0.949019667682, 0.949019667682, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [262.734, 268.202], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 2", np: 3, cix: 2, bm: 0, ix: 2, mn: "ADBE Vector Group", hd: !1 }], ip: 0, op: 166, st: 0, bm: 0 }, { ddd: 0, ind: 3, ty: 4, nm: "gura Outlines", parent: 4, sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 45, s: [300, 300, 0], to: [3.75, 0, 0], ti: [-3.75, 0, 0] }, { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 47.5, s: [322.5, 300, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 120, s: [322.5, 300, 0], to: [-3.75, 0, 0], ti: [3.75, 0, 0] }, { t: 123, s: [300, 300, 0] }], ix: 2 }, a: { a: 0, k: [300, 300, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[1.586, 0], [0, 0], [0, 1.585], [0, 0], [-1.586, 0], [0, 0], [0, -1.585], [0, 0]], o: [[0, 0], [-1.586, 0], [0, 0], [0, -1.585], [0, 0], [1.586, 0], [0, 0], [0, 1.585]], v: [[21.817, 3.196], [-21.816, 3.196], [-24.688, 0.325], [-24.688, -0.325], [-21.816, -3.196], [21.817, -3.196], [24.688, -0.325], [24.688, 0.325]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.43529411764705883, 0.43529411764705883, 0.43529411764705883, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [289.779, 313.178], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }], ip: 0, op: 166, st: 0, bm: 0 }, { ddd: 0, ind: 4, ty: 4, nm: "corp Outlines", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 0, s: [300, 300, 0], to: [-25, 0, 0], ti: [-25, 0, 0] }, { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 45, s: [150, 300, 0], to: [25, 0, 0], ti: [-25, 0, 0] }, { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 120, s: [450, 300, 0], to: [25, 0, 0], ti: [25, 0, 0] }, { t: 165, s: [300, 300, 0] }], ix: 2 }, a: { a: 0, k: [300, 300, 0], ix: 1 }, s: { a: 0, k: [107.364, 107.364, 100], ix: 6 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, -0.029], [-5.404, 0], [0, 5.403], [0, 0.026], [0, 0], [-6.19, 0], [0, -6.2], [0, 0], [0, -7e-3], [-4.612, 0], [-2e-3, 4.61], [0, 0], [0, 1e-3], [0, 1e-3], [0, 0], [-6.12, 0], [0, -7.11], [0, 0], [0, -0.139], [-4.789, 0], [0, 4.789], [7e-3, 0.138], [0, 0], [0, 0], [-7.42, 0], [-1.215, -6.4], [0, 0], [-3.569, 0], [-0.146, 3.533], [0, 0], [0, 0], [39.19, 0], [-0.142, -38.616]], o: [[0, 0], [0, 0.029], [0, 5.403], [5.403, 0], [0, -0.026], [0, 0], [0, -6.2], [6.2, 0], [0, 0], [0, 7e-3], [0, 4.612], [4.61, 0], [0, 0], [0, -1e-3], [0, -1e-3], [0, 0], [1.29, -5.73], [7.11, 0], [0, 0], [-7e-3, 0.138], [0, 4.789], [4.789, 0], [0, -0.139], [0, 0], [0, 0], [0, -7.43], [6.69, 0], [0, 0], [0.147, 3.533], [3.569, 0], [0, 0], [0, 0], [0.171, -39.19], [-39.19, 0], [0, 0]], v: [[-70.798, 47.727], [-70.798, 99.573], [-70.802, 99.659], [-61.018, 109.443], [-51.234, 99.659], [-51.238, 99.582], [-51.238, 85.617], [-40.018, 74.397], [-28.798, 85.617], [-28.798, 113.853], [-28.799, 113.872], [-20.448, 122.224], [-12.098, 113.877], [-12.098, 113.875], [-12.098, 113.872], [-12.098, 113.87], [-12.098, 95.096], [0.442, 85.086], [13.312, 97.947], [13.312, 107.637], [13.309, 108.049], [21.98, 116.721], [30.651, 108.049], [30.63, 107.637], [30.652, 107.637], [30.652, 85.617], [44.092, 72.167], [57.547, 83.447], [57.553, 99.656], [64.171, 106.012], [70.789, 99.656], [70.789, 47.727], [70.789, -51.263], [0, -122.223], [-70.818, -51.837]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [0.43529411764705883, 0.43529411764705883, 0.43529411764705883, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 4, ix: 5 }, lc: 1, lj: 1, ml: 10, bm: 0, nm: "Stroke 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "fl", c: { a: 0, k: [1, 1, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [300, 307.076], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }], ip: 0, op: 166, st: 0, bm: 0 }] }], layers2 = [{ ddd: 0, ind: 1, ty: 0, nm: "fantoma fara umbra", refId: "comp_0", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 0, s: [300, 300, 0], to: [0, 1.667, 0], ti: [0, 0, 0] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 10, s: [300, 310, 0], to: [0, 0, 0], ti: [0, 0, 0] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 30, s: [300, 300, 0], to: [0, 0, 0], ti: [0, 1.667, 0] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 40, s: [300, 310, 0], to: [0, -1.667, 0], ti: [0, 5, 0] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 60, s: [300, 290, 0], to: [0, -5, 0], ti: [0, -5, 0] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 70, s: [300, 280, 0], to: [0, 5, 0], ti: [0, -5, 0] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 90, s: [300, 320, 0], to: [0, 5, 0], ti: [0, 6.667, 0] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 100, s: [300, 310, 0], to: [0, -6.667, 0], ti: [0, 3.333, 0] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 130, s: [300, 280, 0], to: [0, -3.333, 0], ti: [0, 0, 0] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 140, s: [300, 290, 0], to: [0, 0, 0], ti: [0, -1.667, 0] }, { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 150, s: [300, 280, 0], to: [0, 1.667, 0], ti: [0, -3.333, 0] }, { t: 165, s: [300, 300, 0] }], ix: 2 }, a: { a: 0, k: [300, 300, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } }, ao: 0, ef: [{ ty: 5, nm: "(Transform)", np: 14, mn: "ADBE Geometry2", ix: 1, en: 1, ef: [{ ty: 3, nm: "Anchor Point", mn: "ADBE Geometry2-0001", ix: 1, v: { a: 0, k: [0, 0], ix: 1 } }, { ty: 3, nm: "Position", mn: "ADBE Geometry2-0002", ix: 2, v: { a: 0, k: [0, 0], ix: 2 } }, { ty: 7, nm: "Uniform Scale", mn: "ADBE Geometry2-0011", ix: 3, v: { a: 0, k: 1, ix: 3 } }, { ty: 0, nm: "Scale", mn: "ADBE Geometry2-0003", ix: 4, v: { a: 0, k: 100, ix: 4 } }, { ty: 0, nm: " ", mn: "ADBE Geometry2-0004", ix: 5, v: { a: 0, k: 100, ix: 5 } }, { ty: 0, nm: "Skew", mn: "ADBE Geometry2-0005", ix: 6, v: { a: 0, k: 0, ix: 6 } }, { ty: 0, nm: "Skew Axis", mn: "ADBE Geometry2-0006", ix: 7, v: { a: 0, k: 0, ix: 7 } }, { ty: 0, nm: "Rotation", mn: "ADBE Geometry2-0007", ix: 8, v: { a: 0, k: 0, ix: 8 } }, { ty: 0, nm: "Opacity", mn: "ADBE Geometry2-0008", ix: 9, v: { a: 0, k: 100, ix: 9 } }, { ty: 7, nm: "Use Composition\u2019s Shutter Angle", mn: "ADBE Geometry2-0009", ix: 10, v: { a: 0, k: 1, ix: 10 } }, { ty: 0, nm: "Shutter Angle", mn: "ADBE Geometry2-0010", ix: 11, v: { a: 0, k: 0, ix: 11 } }, { ty: 7, nm: "Sampling", mn: "ADBE Geometry2-0012", ix: 12, v: { a: 0, k: 1, ix: 12 } }] }], w: 600, h: 600, ip: 0, op: 167, st: 0, bm: 0 }, { ddd: 0, ind: 2, ty: 4, nm: "umbra Outlines", sr: 1, ks: { o: { a: 0, k: 60, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 1, k: [{ i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 0, s: [300, 493, 0], to: [-25, -0.167, 0], ti: [-25, 0.167, 0] }, { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 45, s: [150, 492, 0], to: [25, -0.167, 0], ti: [-25.042, -0.021, 0] }, { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 120, s: [450, 492, 0], to: [25.042, 0.021, 0], ti: [24.958, -0.021, 0] }, { t: 165, s: [300.25, 492.125, 0] }], ix: 2 }, a: { a: 0, k: [300, 493, 0], ix: 1 }, s: { a: 1, k: [{ i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.228] }, o: { x: [0.937, 0.937, 0.333], y: [0, 0, 0] }, t: 0, s: [100, 100, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 10, s: [105, 105, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 30, s: [100, 100, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 40, s: [105, 105, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 60, s: [95, 95, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 70, s: [92, 92, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 90, s: [110, 110, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 100, s: [105, 105, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 130, s: [90, 90, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 140, s: [95, 95, 100] }, { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 150, s: [90, 90, 100] }, { t: 165, s: [100, 100, 100] }], ix: 6 } }, ao: 0, ef: [{ ty: 5, nm: "Wiggle - scale", np: 6, mn: "ADBE CM WiggleScale", ix: 1, en: 1, ef: [{ ty: 0, nm: "Wiggle Speed (wigs/sec)", mn: "ADBE CM WiggleScale-0001", ix: 1, v: { a: 0, k: 1, ix: 1 } }, { ty: 0, nm: "Wiggle Amount", mn: "ADBE CM WiggleScale-0002", ix: 2, v: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 5, s: [0] }, { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 20, s: [8] }, { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 149, s: [8] }, { t: 161, s: [0] }], ix: 2 } }, { ty: 7, nm: "Wiggle Width Separately?", mn: "ADBE CM WiggleScale-0003", ix: 3, v: { a: 0, k: 0, ix: 3 } }, { ty: 0, nm: "Wiggle Width", mn: "ADBE CM WiggleScale-0004", ix: 4, v: { a: 0, k: 10, ix: 4 } }] }, { ty: 5, nm: "(Transform)", np: 14, mn: "ADBE Geometry2", ix: 2, en: 1, ef: [{ ty: 3, nm: "Anchor Point", mn: "ADBE Geometry2-0001", ix: 1, v: { a: 0, k: [0, 0], ix: 1, x: `var $bm_rt;
$bm_rt = $bm_transform.anchorPoint;` } }, { ty: 3, nm: "Position", mn: "ADBE Geometry2-0002", ix: 2, v: { a: 0, k: [0, 0], ix: 2, x: `var $bm_rt;
$bm_rt = $bm_transform.anchorPoint;` } }, { ty: 7, nm: "Uniform Scale", mn: "ADBE Geometry2-0011", ix: 3, v: { a: 0, k: 0, ix: 3 } }, { ty: 0, nm: "Scale Height", mn: "ADBE Geometry2-0003", ix: 4, v: { a: 0, k: 100, ix: 4, x: `var $bm_rt;
var newScale;
newScale = wiggle(effect('Wiggle - scale')('Wiggle Speed (wigs/sec)'), effect('Wiggle - scale')('Wiggle Amount'));
$bm_rt = newScale < 0 ? 0 : newScale;` } }, { ty: 0, nm: "Scale Width", mn: "ADBE Geometry2-0004", ix: 5, v: { a: 0, k: 100, ix: 5, x: `var $bm_rt;
var newScale, newScale;
if (effect('Wiggle - scale')('Wiggle Width Separately?') == true) {
    newScale = wiggle(effect('Wiggle - scale')('Wiggle Speed (wigs/sec)'), effect('Wiggle - scale')('Wiggle Width'), 1, 0.5, $bm_sum(time, 30));
} else {
    newScale = effect('(Transform)')('Scale Height');
}
;
$bm_rt = newScale < 0 ? 0 : newScale;` } }, { ty: 0, nm: "Skew", mn: "ADBE Geometry2-0005", ix: 6, v: { a: 0, k: 0, ix: 6 } }, { ty: 0, nm: "Skew Axis", mn: "ADBE Geometry2-0006", ix: 7, v: { a: 0, k: 0, ix: 7 } }, { ty: 0, nm: "Rotation", mn: "ADBE Geometry2-0007", ix: 8, v: { a: 0, k: 0, ix: 8 } }, { ty: 0, nm: "Opacity", mn: "ADBE Geometry2-0008", ix: 9, v: { a: 0, k: 100, ix: 9 } }, { ty: 7, nm: "Use Composition\u2019s Shutter Angle", mn: "ADBE Geometry2-0009", ix: 10, v: { a: 0, k: 1, ix: 10 } }, { ty: 0, nm: "Shutter Angle", mn: "ADBE Geometry2-0010", ix: 11, v: { a: 0, k: 0, ix: 11 } }, { ty: 7, nm: "Sampling", mn: "ADBE Geometry2-0012", ix: 12, v: { a: 0, k: 1, ix: 12 } }] }], shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 4.883], [43.436, 0], [0, -4.883], [-43.435, 0]], o: [[0, -4.883], [-43.435, 0], [0, 4.883], [43.436, 0]], v: [[78.647, 0], [0, -8.841], [-78.647, 0], [0, 8.841]], c: !0 }, ix: 2 }, nm: "Path 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.862745157878, 0.866666726505, 0.870588295133, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [300, 479.093], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }], nm: "Group 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }], ip: 0, op: 167, st: 0, bm: 0 }], markers2 = [{ tm: 166, cm: "1", dr: 0 }], no_server_selected_default = { v: v2, meta, fr: fr2, ip: ip2, op: op2, w: w2, h: h2, nm: nm2, ddd: ddd2, assets: assets2, layers: layers2, markers: markers2 };

// app/routes/dashboard._index.tsx
var import_lottie_react3 = require("lottie-react");
var import_jsx_dev_runtime13 = require("react/jsx-dev-runtime");
function DashboardIndex() {
  var _a;
  let guilds = (_a = useRouteData("routes/dashboard")) == null ? void 0 : _a.guilds, options = {
    animationData: no_server_selected_exports,
    loop: !0
  }, guilds_with_bots = (guilds == null ? void 0 : guilds.filter((guild) => guild.hasHearHearBot)) || [], { View } = (0, import_lottie_react3.useLottie)(options);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_jsx_dev_runtime13.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex flex-col items-center  h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "w-96 h-96", children: View }, void 0, !1, {
      fileName: "app/routes/dashboard._index.tsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h1", { className: "text-3xl font-bold mb-0", children: "nothing to see here..." }, void 0, !1, {
      fileName: "app/routes/dashboard._index.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
      StackedAvatar,
      {
        size: 50,
        avatars: guilds_with_bots.map((guild) => `${guild.id}/${guild.icon}`)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/dashboard._index.tsx",
        lineNumber: 23,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-gray-500 text-center", children: [
      "You have ",
      guilds_with_bots.length,
      " servers with HearHear installed. Select one to get started!"
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard._index.tsx",
      lineNumber: 28,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard._index.tsx",
    lineNumber: 20,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard._index.tsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}
function StackedAvatar({
  size,
  avatars
}) {
  let style = {
    border: "4px solid white",
    marginLeft: -(size / 2) + "px"
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { style: { marginLeft: size / 2 }, children: avatars.map((avatar, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
    "img",
    {
      src: avatar === null ? "https://cdn.discordapp.com/embed/avatars/0.png" : `https://cdn.discordapp.com/icons/${avatar}`,
      alt: "discord server icon",
      className: "w-12 h-12 rounded-full object-cover mb-0 inline-block",
      style
    },
    idx,
    !1,
    {
      fileName: "app/routes/dashboard._index.tsx",
      lineNumber: 52,
      columnNumber: 9
    },
    this
  )) }, void 0, !1, {
    fileName: "app/routes/dashboard._index.tsx",
    lineNumber: 50,
    columnNumber: 5
  }, this);
}

// app/routes/auth.discord.tsx
var auth_discord_exports = {};
__export(auth_discord_exports, {
  action: () => action4,
  loader: () => loader9
});
var import_node9 = require("@remix-run/node");
var loader9 = async ({ request }) => (await auth.isAuthenticated(request, {
  failureRedirect: "/login"
}), (0, import_node9.redirect)("/dashboard")), action4 = ({ request }) => auth.authenticate("discord", request);

// app/routes/dashboard.tsx
var dashboard_exports = {};
__export(dashboard_exports, {
  default: () => DashboardLayout,
  loader: () => loader10,
  meta: () => meta2
});
var import_react19 = require("@remix-run/react");
var import_dotenv3 = require("dotenv");
var import_react20 = require("react");

// app/components/faq.tsx
var import_react17 = require("react"), import_react18 = require("@headlessui/react"), import_outline3 = require("@heroicons/react/24/outline"), import_jsx_dev_runtime14 = require("react/jsx-dev-runtime");
function HowToUseBOT() {
  let [open, setOpen] = (0, import_react17.useState)(!1), cancelButtonRef = (0, import_react17.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_jsx_dev_runtime14.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
      "p",
      {
        className: "text-gray-500 text-md mx-6 cursor-pointer",
        onClick: () => setOpen(!0),
        children: "How to use the bot?"
      },
      void 0,
      !1,
      {
        fileName: "app/components/faq.tsx",
        lineNumber: 12,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react18.Transition.Root, { show: open, as: import_react17.Fragment, children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
      import_react18.Dialog,
      {
        as: "div",
        className: "relative z-10",
        initialFocus: cancelButtonRef,
        onClose: setOpen,
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
            import_react18.Transition.Child,
            {
              as: import_react17.Fragment,
              enter: "ease-out duration-300",
              enterFrom: "opacity-0",
              enterTo: "opacity-100",
              leave: "ease-in duration-200",
              leaveFrom: "opacity-100",
              leaveTo: "opacity-0",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, void 0, !1, {
                fileName: "app/components/faq.tsx",
                lineNumber: 34,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/components/faq.tsx",
              lineNumber: 25,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "fixed inset-0 z-10 overflow-y-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
            import_react18.Transition.Child,
            {
              as: import_react17.Fragment,
              enter: "ease-out duration-300",
              enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
              enterTo: "opacity-100 translate-y-0 sm:scale-100",
              leave: "ease-in duration-200",
              leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
              leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react18.Dialog.Panel, { className: "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "sm:flex sm:items-start", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 sm:mx-0 sm:h-10 sm:w-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
                  import_outline3.CodeBracketIcon,
                  {
                    className: "h-6 w-6 text-white",
                    "aria-hidden": "true"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/faq.tsx",
                    lineNumber: 52,
                    columnNumber: 25
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "app/components/faq.tsx",
                  lineNumber: 51,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
                    import_react18.Dialog.Title,
                    {
                      as: "h1",
                      className: "text-xl font-bold leading-6 text-gray-900",
                      children: "HearHear Bot Commands"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/faq.tsx",
                      lineNumber: 58,
                      columnNumber: 25
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mt-5", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("p", { className: "text-sm text-gray-800 mt-3", children: "The following commands can be used in any text channels that the bot has access to." }, void 0, !1, {
                      fileName: "app/components/faq.tsx",
                      lineNumber: 65,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("p", { className: "text-sm text-gray-500 my-5", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("code", { className: "text-sm text-gray-800 px-3 py-[0.2rem] border border-gray-200 rounded-md", children: "/start" }, void 0, !1, {
                        fileName: "app/components/faq.tsx",
                        lineNumber: 71,
                        columnNumber: 29
                      }, this),
                      " ",
                      "When you are in a voice channel, use this command to invite the bot to your channel and immediately start recordings."
                    ] }, void 0, !0, {
                      fileName: "app/components/faq.tsx",
                      lineNumber: 70,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("p", { className: "text-sm text-gray-500 mb-5", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("code", { className: "text-sm text-gray-800 px-3 py-[0.2rem] border border-gray-200 rounded-md", children: "/end" }, void 0, !1, {
                        fileName: "app/components/faq.tsx",
                        lineNumber: 79,
                        columnNumber: 29
                      }, this),
                      " ",
                      "Use this command to make the bot leave the voice channel and the bot will process the recordings."
                    ] }, void 0, !0, {
                      fileName: "app/components/faq.tsx",
                      lineNumber: 78,
                      columnNumber: 27
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/components/faq.tsx",
                    lineNumber: 64,
                    columnNumber: 25
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/components/faq.tsx",
                  lineNumber: 57,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/components/faq.tsx",
                lineNumber: 50,
                columnNumber: 21
              }, this) }, void 0, !1, {
                fileName: "app/components/faq.tsx",
                lineNumber: 49,
                columnNumber: 19
              }, this) }, void 0, !1, {
                fileName: "app/components/faq.tsx",
                lineNumber: 48,
                columnNumber: 17
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/components/faq.tsx",
              lineNumber: 39,
              columnNumber: 15
            },
            this
          ) }, void 0, !1, {
            fileName: "app/components/faq.tsx",
            lineNumber: 38,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/components/faq.tsx",
            lineNumber: 37,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/faq.tsx",
        lineNumber: 19,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/faq.tsx",
      lineNumber: 18,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/faq.tsx",
    lineNumber: 11,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard.tsx
var import_outline4 = require("@heroicons/react/24/outline"), import_crisp_sdk_web = require("crisp-sdk-web");
var import_jsx_dev_runtime15 = require("react/jsx-dev-runtime"), loader10 = async ({ request }) => {
  let user = await auth.isAuthenticated(request, {
    failureRedirect: "/new"
  });
  (0, import_dotenv3.config)(), await (await createSupabaseClient(process.env.SUPABASE_KEY || "")).loginUser(user);
  let hearHearBotId = process.env.DISCORD_CLIENT_ID || "", hearHearBotToken = process.env.DISCORD_BOT_TOKEN || "", guilds = await Promise.all(
    getUserGuilds(user).map(async (guild) => ({
      ...guild,
      hasHearHearBot: await botIsInGuild(
        guild,
        hearHearBotId,
        hearHearBotToken
      )
    }))
  );
  return { user, guilds };
}, meta2 = ({ data }) => [{ title: `Dashboard - ${data.user.displayName} - HearHear` }];
function DashboardLayout() {
  let [selectedGuild, setSelectedGuild] = (0, import_react20.useState)(
    void 0
  ), { user, guilds } = (0, import_react19.useLoaderData)(), navigation = (0, import_react19.useNavigation)(), guildId = useRouteParam("routes/dashboard", "guild");
  guildId !== void 0 && selectedGuild === void 0 && setSelectedGuild(guildId);
  let handleClick = (guildId2) => {
    setSelectedGuild(guildId2);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_jsx_dev_runtime15.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex bg-gray-50 overflow-hidden min-h-screen", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("nav", { className: "w-64 bg-slate-100 border-r border-gray-200 h-screen flex flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "px-6 pt-8", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("h1", { className: "text-xl font-bold mb-4", children: "Dashboard" }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 94,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("h2", { className: "text-sm text-gray-600 mb-4", children: [
            "Welcome ",
            user.displayName,
            "#",
            user.discriminator
          ] }, void 0, !0, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 95,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("h2", { className: "text-md font-bold", children: "Your Servers" }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 98,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 93,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("ul", { className: "flex-grow text-sm text-gray-600 w-full", children: guilds.map((guild) => /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
          import_react19.NavLink,
          {
            prefetch: "intent",
            to: `/dashboard/guilds/${guild.id}`,
            onClick: () => handleClick(guild.id),
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
              "li",
              {
                className: `flex items-center py-2 hover:bg-gray-200 ${selectedGuild === guild.id ? "bg-gray-200" : ""}`,
                children: [
                  guild.icon === null ? /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
                    "img",
                    {
                      src: "https://cdn.discordapp.com/embed/avatars/0.png",
                      alt: guild.name,
                      className: " ml-6 w-8 h-8 rounded-full mr-1"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/dashboard.tsx",
                      lineNumber: 115,
                      columnNumber: 21
                    },
                    this
                  ) : /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
                    "img",
                    {
                      src: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`,
                      alt: guild.name,
                      className: " ml-6 w-8 h-8 rounded-full mr-1"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/dashboard.tsx",
                      lineNumber: 121,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("span", { className: "text-gray-700", children: guild.name }, void 0, !1, {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 128,
                    columnNumber: 19
                  }, this)
                ]
              },
              guild.id,
              !0,
              {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 108,
                columnNumber: 17
              },
              this
            )
          },
          guild.id,
          !1,
          {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 102,
            columnNumber: 15
          },
          this
        )) }, void 0, !1, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 100,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("footer", { className: "h-[3rem] flex items-center ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(HowToUseBOT, {}, void 0, !1, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 135,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 134,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("footer", { className: "h-[3rem] flex items-center mb-10 ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
          "p",
          {
            className: "text-gray-500 text-md mx-6 cursor-pointer",
            onClick: () => window.open("https://discord.gg/mt2JMftH2r", "_blank"),
            children: "\u26A1 Instant Support"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 138,
            columnNumber: 13
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 137,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("footer", { className: "h-[4rem] bg-slate-800 flex justify-center items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
            "img",
            {
              src: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
              alt: user.displayName,
              className: "w-10 h-10 rounded-full mx-1"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 149,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex flex-col ml-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("span", { className: "text-gray-100 font-medium text-sm", children: user.displayName }, void 0, !1, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 156,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("span", { className: "text-gray-400 text-sm", children: [
              "#",
              user.discriminator
            ] }, void 0, !0, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 159,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 155,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_react19.Form, { action: "/auth/discord/logout", method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("button", { className: "bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-2 rounded-full ml-8 mr-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_outline4.ArrowRightOnRectangleIcon, { className: "w-6 h-6 text-black stroke-2" }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 166,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 165,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 164,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 148,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(selectedMeetingContext_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex-1 max-h-screen overflow-auto", children: navigation.state === "loading" && navigation.location.pathname.match(/^\/dashboard\/guilds\/\d+$/) !== null ? /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(Skeleton, {}, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 176,
        columnNumber: 15
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_react19.Outlet, {}, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 178,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 172,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 171,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 91,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(CrispChat, {}, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 183,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 82,
    columnNumber: 5
  }, this);
}
function getUserGuilds(user) {
  return user.guilds ? user.guilds.map((guild) => guild) : [];
}
async function botIsInGuild(guild, hearHearBotId, hearHearBotToken) {
  return (await fetch(
    `https://discord.com/api/guilds/${guild.id}/members/${hearHearBotId}`,
    {
      headers: {
        Authorization: `Bot ${hearHearBotToken}`
      }
    }
  )).status === 200;
}
function Skeleton() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex-auto max-w-md border-r-2 border-gray-200 p-10 min-h-screen", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("h1", { className: "text-3xl font-bold animate-pulse", children: "Meetings" }, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 213,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "mt-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("ul", { children: [1, 2, 3].map((_, id) => /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
        "li",
        {
          className: "flex-col flex items-center justify-center mb-5",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "bg-slate-100 rounded-lg shadow-lg p-4 min-h-[7rem] min-w-full animate-pulse" }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 222,
            columnNumber: 19
          }, this)
        },
        id,
        !1,
        {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 218,
          columnNumber: 17
        },
        this
      )) }, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 215,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 214,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 212,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex-auto max-h-screen", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "animate-pulse min-h-screen" }, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 231,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 230,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 211,
    columnNumber: 5
  }, this);
}
function CrispChat() {
  return (0, import_react20.useEffect)(() => {
    import_crisp_sdk_web.Crisp.configure("5e3e4cdc-0b90-497d-b632-ef9df4a5786e");
  }, []), null;
}

// app/routes/privacy.tsx
var privacy_exports = {};
__export(privacy_exports, {
  default: () => PrivacyPolicyPage,
  meta: () => meta3
});
var import_jsx_dev_runtime16 = require("react/jsx-dev-runtime"), meta3 = () => [{ title: "Privacy Policy" }];
function PrivacyPolicyPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("h1", { className: "text-3xl font-extrabold text-gray-900 mb-6", children: "Privacy Policy" }, void 0, !1, {
      fileName: "app/routes/privacy.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "Your privacy is important to us. It is HearHear's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate." }, void 0, !1, {
      fileName: "app/routes/privacy.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used." }, void 0, !1, {
      fileName: "app/routes/privacy.tsx",
      lineNumber: 18,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification." }, void 0, !1, {
      fileName: "app/routes/privacy.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "We don't share any personally identifying information publicly or with third-parties, except when required to by law." }, void 0, !1, {
      fileName: "app/routes/privacy.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies." }, void 0, !1, {
      fileName: "app/routes/privacy.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services." }, void 0, !1, {
      fileName: "app/routes/privacy.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us." }, void 0, !1, {
      fileName: "app/routes/privacy.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "text-gray-700 leading-7", children: "This policy is effective as of 20 April, 2023." }, void 0, !1, {
      fileName: "app/routes/privacy.tsx",
      lineNumber: 51,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/privacy.tsx",
    lineNumber: 9,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index3,
  meta: () => meta4
});

// app/components/nav.tsx
var import_react21 = require("@remix-run/react"), import_react22 = require("react");

// app/assets/logo.svg
var logo_default = "/build/_assets/logo-YCCMHOUM.svg";

// app/components/nav.tsx
var import_jsx_dev_runtime17 = require("react/jsx-dev-runtime");
function NavBar() {
  var _a;
  let [isOpen, setIsOpen] = (0, import_react22.useState)(!1), user = (_a = useRouteData("root")) == null ? void 0 : _a.user;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("nav", { className: "bg-white border-b border-gray-200 sticky top-0 z-10", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex justify-between h-16", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex-shrink-0 flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("img", { className: "h-10 w-auto", src: logo_default, alt: "Workflow" }, void 0, !1, {
          fileName: "app/components/nav.tsx",
          lineNumber: 17,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("h1", { className: "text-2xl font-bold text-gray-900 ml-2", children: "HearHear" }, void 0, !1, {
          fileName: "app/components/nav.tsx",
          lineNumber: 18,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/nav.tsx",
        lineNumber: 16,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/nav.tsx",
        lineNumber: 15,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "hidden sm:ml-6 sm:flex sm:items-center", children: user && /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_jsx_dev_runtime17.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
          "button",
          {
            className: "text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium",
            onClick: () => setIsOpen(!isOpen),
            children: user.avatar === null ? /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
              "img",
              {
                src: "https://cdn.discordapp.com/embed/avatars/0.png",
                alt: "user icon",
                className: "w-10 h-10 rounded-full object-cover mb-0 hover:opacity-80"
              },
              void 0,
              !1,
              {
                fileName: "app/components/nav.tsx",
                lineNumber: 33,
                columnNumber: 21
              },
              this
            ) : /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
              "img",
              {
                src: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
                alt: "user avatar",
                className: "w-10 h-10 rounded-full object-cover mb-0 hover:opacity-80"
              },
              void 0,
              !1,
              {
                fileName: "app/components/nav.tsx",
                lineNumber: 39,
                columnNumber: 21
              },
              this
            )
          },
          void 0,
          !1,
          {
            fileName: "app/components/nav.tsx",
            lineNumber: 28,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_react21.Form, { action: "/auth/discord/logout", method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("button", { className: "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full", children: "Logout" }, void 0, !1, {
          fileName: "app/components/nav.tsx",
          lineNumber: 48,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/components/nav.tsx",
          lineNumber: 47,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/nav.tsx",
        lineNumber: 27,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/nav.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "-mr-2 flex items-center sm:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
        "button",
        {
          onClick: () => setIsOpen(!isOpen),
          type: "button",
          className: "bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
          "aria-expanded": "false",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", { className: "sr-only", children: "Open main menu" }, void 0, !1, {
              fileName: "app/components/nav.tsx",
              lineNumber: 63,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
              "svg",
              {
                className: `${isOpen ? "hidden" : "block"} h-6 w-6`,
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "aria-hidden": "true",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M4 6h16M4 12h16M4 18h16"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/nav.tsx",
                    lineNumber: 73,
                    columnNumber: 17
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/components/nav.tsx",
                lineNumber: 65,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
              "svg",
              {
                className: `${isOpen ? "block" : "hidden"} h-6 w-6`,
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "aria-hidden": "true",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M6 18L18 6M6 6l12 12"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/nav.tsx",
                    lineNumber: 89,
                    columnNumber: 17
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/components/nav.tsx",
                lineNumber: 81,
                columnNumber: 15
              },
              this
            )
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/nav.tsx",
          lineNumber: 57,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/nav.tsx",
        lineNumber: 55,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/nav.tsx",
      lineNumber: 14,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/nav.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: `${isOpen ? "block" : "hidden"} sm:hidden`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "pt-2 pb-4 space-y-1", children: user && /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
      "button",
      {
        className: "text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium",
        onClick: () => setIsOpen(!1),
        children: "Open Todos"
      },
      void 0,
      !1,
      {
        fileName: "app/components/nav.tsx",
        lineNumber: 105,
        columnNumber: 13
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/nav.tsx",
      lineNumber: 103,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/nav.tsx",
      lineNumber: 102,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/nav.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  default: () => Login,
  loader: () => loader11
});
var import_react23 = require("@remix-run/react"), import_react_router_dom = require("react-router-dom");
var import_node10 = require("@remix-run/node"), import_jsx_dev_runtime18 = require("react/jsx-dev-runtime"), loader11 = ({ request }) => {
  (0, import_node10.redirect)("/");
};
function Login() {
  var _a;
  let user = (_a = useRouteData("root")) == null ? void 0 : _a.user;
  return user ? /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("p", { className: "mt-4 text-gray-300", children: [
      "\u{1F44B} Welcome back, ",
      user.displayName,
      "!"
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_react_router_dom.Link, { to: "/dashboard", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("button", { className: "bg-black hover:bg-gray-800 text-white font-bold py-4 px-4 rounded mt-5 border-white border-2", children: "go to my dashboard" }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 30,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 29,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 25,
    columnNumber: 7
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_react23.Form, { action: "/auth/discord", method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("button", { className: "bg-black hover:bg-gray-800 text-white font-bold py-4 px-4 rounded mt-5 border-white border-2", children: "\u2728 get started \u2728" }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 18,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 17,
    columnNumber: 7
  }, this);
}

// app/assets/planets.png
var planets_default = "/build/_assets/planets-7I6ANPDR.png";

// app/components/landing/headline.tsx
var import_jsx_dev_runtime19 = require("react/jsx-dev-runtime");
function HeadLine() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "bg-black pb-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "max-w-xl px-4 md:w-1/2 md:pr-10 py-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("h1", { className: "text-4xl font-extrabold text-yellow-300 sm:text-5xl sm:tracking-tight lg:text-6xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "block", children: [
        "10x your daily ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "block text-white", children: "meetings" }, void 0, !1, {
          fileName: "app/components/landing/headline.tsx",
          lineNumber: 11,
          columnNumber: 30
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/landing/headline.tsx",
        lineNumber: 10,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/landing/headline.tsx",
        lineNumber: 9,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("p", { className: "mt-5 text-xl text-gray-400", children: "Transform your meetings into actionable insights. With HearHear, say goodbye to missed tasks and forgotten ideas." }, void 0, !1, {
        fileName: "app/components/landing/headline.tsx",
        lineNumber: 14,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "mt-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(Login, {}, void 0, !1, {
        fileName: "app/components/landing/headline.tsx",
        lineNumber: 19,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/landing/headline.tsx",
        lineNumber: 18,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/landing/headline.tsx",
      lineNumber: 8,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "hidden md:block md:w-1/2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("img", { src: planets_default, alt: "planets", className: "" }, void 0, !1, {
      fileName: "app/components/landing/headline.tsx",
      lineNumber: 23,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/landing/headline.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/landing/headline.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/landing/headline.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// app/components/landing/how.tsx
var import_react24 = require("@remix-run/react");

// app/assets/hearhear-demo.mp4
var hearhear_demo_default = "/build/_assets/hearhear-demo-RTZZIIBK.mp4";

// app/assets/Stage-Icon.svg
var Stage_Icon_default = "/build/_assets/Stage-Icon-5YTZ4IBA.svg";

// app/assets/Voice-Icon.svg
var Voice_Icon_default = "/build/_assets/Voice-Icon-RTLLWHRG.svg";

// app/components/landing/how.tsx
var import_jsx_dev_runtime20 = require("react/jsx-dev-runtime");
function HowHearHearWorks() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "bg-gray-200 flex", children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-col md:flex-col lg:flex-row items-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "max-w-xl sm:pr-10 mt-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
      "video",
      {
        autoPlay: !0,
        muted: !0,
        loop: !0,
        id: "myVideo",
        className: "rounded-2xl shadow-2xl",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("source", { src: hearhear_demo_default, type: "video/mp4" }, void 0, !1, {
          fileName: "app/components/landing/how.tsx",
          lineNumber: 18,
          columnNumber: 13
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/landing/how.tsx",
        lineNumber: 11,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/landing/how.tsx",
      lineNumber: 10,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("h2", { className: "text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight lg:text-5xl", children: "How HearHear Works" }, void 0, !1, {
        fileName: "app/components/landing/how.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "mt-5 space-y-6 text-sm text-gray-500 ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "border-green-700 border-2 rounded-lg p-1 max-w-fit bg-green-200 bg-opacity-90", children: [
        "Supported Channel Types:",
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("span", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
          "img",
          {
            src: Voice_Icon_default,
            className: "inline-block h-5 w-5 ml-2",
            alt: "Voice Channel"
          },
          void 0,
          !1,
          {
            fileName: "app/components/landing/how.tsx",
            lineNumber: 30,
            columnNumber: 17
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/landing/how.tsx",
          lineNumber: 29,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("span", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
          "img",
          {
            src: Stage_Icon_default,
            className: "inline-block h-5 w-5 ml-2",
            alt: "Stage Channel"
          },
          void 0,
          !1,
          {
            fileName: "app/components/landing/how.tsx",
            lineNumber: 37,
            columnNumber: 17
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/landing/how.tsx",
          lineNumber: 36,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/landing/how.tsx",
        lineNumber: 27,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/landing/how.tsx",
        lineNumber: 26,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "max-w-xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "mt-10", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex items-center justify-center h-12 w-12 rounded-md bg-yellow-300 text-black font-bold text-xl", children: "1" }, void 0, !1, {
            fileName: "app/components/landing/how.tsx",
            lineNumber: 49,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/components/landing/how.tsx",
            lineNumber: 48,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "ml-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("h3", { className: "text-lg leading-6 font-bold text-gray-900", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
                "span",
                {
                  className: "underline decoration-4 cursor-pointer",
                  onClick: () => {
                    window.open(
                      "https://discord.com/api/oauth2/authorize?client_id=1094729151514161204&permissions=380139210752&scope=applications.commands%20bot",
                      "popup",
                      "width=600,height=600"
                    );
                  },
                  children: "Add the bot"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/landing/how.tsx",
                  lineNumber: 55,
                  columnNumber: 21
                },
                this
              ),
              " ",
              "to Your Server"
            ] }, void 0, !0, {
              fileName: "app/components/landing/how.tsx",
              lineNumber: 54,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "mt-2 text-base text-gray-500", children: "Make sure you assign the right roles for the bot to join channels or stages that require permissions." }, void 0, !1, {
              fileName: "app/components/landing/how.tsx",
              lineNumber: 69,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/landing/how.tsx",
            lineNumber: 53,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/landing/how.tsx",
          lineNumber: 47,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "mt-10 flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex items-center justify-center h-12 w-12 rounded-md bg-yellow-300 text-black font-bold text-xl", children: "2" }, void 0, !1, {
            fileName: "app/components/landing/how.tsx",
            lineNumber: 77,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/components/landing/how.tsx",
            lineNumber: 76,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "ml-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("h3", { className: "text-lg leading-6 font-bold text-gray-900", children: "Start a Meeting" }, void 0, !1, {
              fileName: "app/components/landing/how.tsx",
              lineNumber: 82,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "mt-2 text-base text-gray-500", children: [
              "When you're in a voice channel or stage, type",
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("code", { className: "text-black border-gray-500 border-2 rounded-md p-1", children: "/start" }, void 0, !1, {
                fileName: "app/components/landing/how.tsx",
                lineNumber: 87,
                columnNumber: 21
              }, this),
              " ",
              "in any text channel. The bot will join the voice channel and start recording."
            ] }, void 0, !0, {
              fileName: "app/components/landing/how.tsx",
              lineNumber: 85,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/landing/how.tsx",
            lineNumber: 81,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/landing/how.tsx",
          lineNumber: 75,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "mt-10 flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex items-center justify-center h-12 w-12 rounded-md bg-yellow-300 text-black font-bold text-xl", children: "3" }, void 0, !1, {
            fileName: "app/components/landing/how.tsx",
            lineNumber: 97,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/components/landing/how.tsx",
            lineNumber: 96,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "ml-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("h3", { className: "text-lg leading-6 font-bold text-gray-900", children: "Finish the Meeting" }, void 0, !1, {
              fileName: "app/components/landing/how.tsx",
              lineNumber: 102,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "mt-2 text-base text-gray-500", children: [
              "Type",
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("code", { className: "text-black border-gray-500 border-2 rounded-md p-1", children: "/end" }, void 0, !1, {
                fileName: "app/components/landing/how.tsx",
                lineNumber: 107,
                columnNumber: 21
              }, this),
              " ",
              "in any text channel. The bot will leave the voice channel and process the recording. You can see the meeting details in the",
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_react24.Link, { to: "/dashboard", className: "text-yellow-600", children: "dashboard" }, void 0, !1, {
                fileName: "app/components/landing/how.tsx",
                lineNumber: 113,
                columnNumber: 21
              }, this),
              "."
            ] }, void 0, !0, {
              fileName: "app/components/landing/how.tsx",
              lineNumber: 105,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/landing/how.tsx",
            lineNumber: 101,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/landing/how.tsx",
          lineNumber: 95,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/landing/how.tsx",
        lineNumber: 46,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/landing/how.tsx",
        lineNumber: 45,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/landing/how.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/landing/how.tsx",
    lineNumber: 9,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/landing/how.tsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}

// app/assets/insight-generation.mp4
var insight_generation_default = "/build/_assets/insight-generation-NOALV4YV.mp4";

// app/components/landing/features.tsx
var import_outline5 = require("@heroicons/react/24/outline"), import_jsx_dev_runtime21 = require("react/jsx-dev-runtime");
function Features() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "bg-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-col md:flex-col lg:flex-row items-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "max-w-full py-16 px-4 sm:py-24 sm:px-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "max-w-xl", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("h2", { className: "text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight lg:text-5xl", children: "Features" }, void 0, !1, {
        fileName: "app/components/landing/features.tsx",
        lineNumber: 15,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "mt-10 flex", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "flex items-center justify-center h-12 w-12 rounded-md bg-sky-500 text-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_outline5.BoltIcon, { className: "w-6 h-6" }, void 0, !1, {
          fileName: "app/components/landing/features.tsx",
          lineNumber: 22,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/components/landing/features.tsx",
          lineNumber: 21,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/components/landing/features.tsx",
          lineNumber: 20,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "ml-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: "Generate Customized Insights" }, void 0, !1, {
            fileName: "app/components/landing/features.tsx",
            lineNumber: 26,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("p", { className: "mt-2 text-base text-gray-500", children: "HearHear can generate any insight based on the templates you built. Whether it's summary in haiku format, action items, vibe check, or tension analysis, sky is the limit." }, void 0, !1, {
            fileName: "app/components/landing/features.tsx",
            lineNumber: 29,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/landing/features.tsx",
          lineNumber: 25,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/landing/features.tsx",
        lineNumber: 19,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "mt-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "flex", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "flex items-center justify-center h-12 w-12 rounded-md bg-sky-500 text-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_outline5.DocumentTextIcon, { className: "w-6 h-6" }, void 0, !1, {
          fileName: "app/components/landing/features.tsx",
          lineNumber: 41,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "app/components/landing/features.tsx",
          lineNumber: 40,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/components/landing/features.tsx",
          lineNumber: 39,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "ml-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: "Raw Transcript Access" }, void 0, !1, {
            fileName: "app/components/landing/features.tsx",
            lineNumber: 45,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("p", { className: "mt-2 text-base text-gray-500", children: "You can access the raw transcript with audio playback to triple-check. No more unaddressed misunderstandings." }, void 0, !1, {
            fileName: "app/components/landing/features.tsx",
            lineNumber: 48,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/landing/features.tsx",
          lineNumber: 44,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/landing/features.tsx",
        lineNumber: 38,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/landing/features.tsx",
        lineNumber: 37,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "mt-10 flex", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "flex items-center justify-center h-12 w-12 rounded-md bg-sky-500 text-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_outline5.ShieldCheckIcon, { className: "w-6 h-6" }, void 0, !1, {
          fileName: "app/components/landing/features.tsx",
          lineNumber: 59,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/components/landing/features.tsx",
          lineNumber: 58,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/components/landing/features.tsx",
          lineNumber: 57,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "ml-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: "First Class Security" }, void 0, !1, {
            fileName: "app/components/landing/features.tsx",
            lineNumber: 63,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("p", { className: "mt-2 text-base text-gray-500", children: "HearHear is built with security in mind. We use industry standard security practices to ensure your data is safe." }, void 0, !1, {
            fileName: "app/components/landing/features.tsx",
            lineNumber: 66,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/landing/features.tsx",
          lineNumber: 62,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/landing/features.tsx",
        lineNumber: 56,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/landing/features.tsx",
      lineNumber: 14,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/landing/features.tsx",
      lineNumber: 13,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "hidden lg:block sm:px-0 lg:px-0 z-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "max-w-2xl mt-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
      "video",
      {
        autoPlay: !0,
        muted: !0,
        loop: !0,
        id: "myVideo",
        className: "rounded-2xl shadow-2xl",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("source", { src: insight_generation_default, type: "video/mp4" }, void 0, !1, {
          fileName: "app/components/landing/features.tsx",
          lineNumber: 83,
          columnNumber: 15
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/landing/features.tsx",
        lineNumber: 76,
        columnNumber: 13
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/landing/features.tsx",
      lineNumber: 75,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/landing/features.tsx",
      lineNumber: 74,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/landing/features.tsx",
    lineNumber: 12,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/landing/features.tsx",
    lineNumber: 11,
    columnNumber: 5
  }, this);
}

// app/components/landing/contact.tsx
var import_jsx_dev_runtime22 = require("react/jsx-dev-runtime");
function Contact() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", { className: "bg-gray-900", children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", { className: "max-w-7xl mx-auto py-10 px-4 sm:py-10 sm:px-6 lg:px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", { className: "max-w-xl px-4 py-6 mx-auto lg:mx-0", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("h2", { className: "text-3xl font-extrabold text-white sm:text-4xl sm:tracking-tight lg:text-5xl", children: "Got a question?" }, void 0, !1, {
      fileName: "app/components/landing/contact.tsx",
      lineNumber: 6,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("p", { className: "mt-5 text-xl text-gray-400", children: "If you have any questions, feel free to reach out to me on Twitter. I'm always happy to help!" }, void 0, !1, {
      fileName: "app/components/landing/contact.tsx",
      lineNumber: 9,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", { className: "mt-8 space-x-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
      "a",
      {
        href: "https://twitter.com/theXipuLi",
        target: "_blank",
        className: "inline-block bg-sky-500 py-3 px-6 border border-transparent rounded-md font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500",
        rel: "noreferrer",
        children: "Drop a dm"
      },
      void 0,
      !1,
      {
        fileName: "app/components/landing/contact.tsx",
        lineNumber: 14,
        columnNumber: 13
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/landing/contact.tsx",
      lineNumber: 13,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/landing/contact.tsx",
    lineNumber: 5,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/components/landing/contact.tsx",
    lineNumber: 4,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/landing/contact.tsx",
    lineNumber: 3,
    columnNumber: 5
  }, this);
}

// app/components/landing/footer.tsx
var import_react25 = require("@remix-run/react"), import_jsx_dev_runtime23 = require("react/jsx-dev-runtime");
function Footer() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("footer", { className: "bg-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
      "nav",
      {
        className: "-mx-5 -my-2 flex flex-wrap justify-center",
        "aria-label": "Footer",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "px-5 py-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
            import_react25.Link,
            {
              to: "/privacy",
              className: "text-base text-gray-500 hover:text-gray-900",
              children: "Privacy Policy"
            },
            void 0,
            !1,
            {
              fileName: "app/components/landing/footer.tsx",
              lineNumber: 12,
              columnNumber: 13
            },
            this
          ) }, void 0, !1, {
            fileName: "app/components/landing/footer.tsx",
            lineNumber: 11,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "px-5 py-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
            import_react25.Link,
            {
              to: "/terms",
              className: "text-base text-gray-500 hover:text-gray-900",
              children: "Terms and Conditions"
            },
            void 0,
            !1,
            {
              fileName: "app/components/landing/footer.tsx",
              lineNumber: 20,
              columnNumber: 13
            },
            this
          ) }, void 0, !1, {
            fileName: "app/components/landing/footer.tsx",
            lineNumber: 19,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/landing/footer.tsx",
        lineNumber: 7,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "mt-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("p", { className: "text-base text-gray-400 text-center", children: [
      "\xA9 ",
      new Date(Date.now()).getFullYear(),
      " HearHear. All rights reserved."
    ] }, void 0, !0, {
      fileName: "app/components/landing/footer.tsx",
      lineNumber: 29,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/landing/footer.tsx",
      lineNumber: 28,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/landing/footer.tsx",
    lineNumber: 6,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/landing/footer.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/components/landing.tsx
var import_jsx_dev_runtime24 = require("react/jsx-dev-runtime");
function LandingPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "bg-black", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(HeadLine, {}, void 0, !1, {
      fileName: "app/components/landing.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(HowHearHearWorks, {}, void 0, !1, {
      fileName: "app/components/landing.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Features, {}, void 0, !1, {
      fileName: "app/components/landing.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Contact, {}, void 0, !1, {
      fileName: "app/components/landing.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Footer, {}, void 0, !1, {
      fileName: "app/components/landing.tsx",
      lineNumber: 14,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/landing.tsx",
    lineNumber: 9,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var import_jsx_dev_runtime25 = require("react/jsx-dev-runtime"), meta4 = () => [{ title: "HearHear | 10x your daily meetings" }];
function Index3() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(import_jsx_dev_runtime25.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(NavBar, {}, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("main", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(LandingPage, {}, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 16,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 15,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 14,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 11,
    columnNumber: 5
  }, this);
}

// app/routes/terms.tsx
var terms_exports = {};
__export(terms_exports, {
  default: () => TermsAndConditionsPage,
  meta: () => meta5
});
var import_jsx_dev_runtime26 = require("react/jsx-dev-runtime"), meta5 = () => [{ title: "Terms and Conditions" }];
function TermsAndConditionsPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h1", { className: "text-3xl font-extrabold text-gray-900 mb-6", children: "Terms and Conditions" }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "Please read these terms and conditions carefully before using our website operated by HearHear. Your access to and use of the website is conditioned on your acceptance of and compliance with these terms. These terms apply to all visitors, users, and others who access or use the website." }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Accounts" }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "When you create an account with us, you must provide accurate, complete, and up-to-date information. Failure to do so constitutes a breach of the terms, which may result in immediate termination of your account on our website." }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "You are responsible for safeguarding the password that you use to access the website and for any activities or actions under your password, whether your password is with our website or a third-party service." }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account." }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Intellectual Property" }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "The website and its original content, features, and functionality are owned by HearHear and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws." }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Links To Other Web Sites" }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 46,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "Our website may contain links to third-party web sites or services that are not owned or controlled by HearHear. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that HearHear shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services." }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Termination and Suspension" }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "We may terminate or suspend access to our website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the terms. All provisions of the terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability." }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Indemnification" }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "You agree to defend, indemnify and hold harmless HearHear and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the website, by you or any person using your account and password, or b) a breach of these terms." }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Limitation Of Liability" }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "In no event shall HearHear, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the website; (ii) any conduct or content of any third party on the website; (iii) any content obtained from the website; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose." }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 84,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Disclaimer" }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 98,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: 'Your use of the website is at your sole risk. The website is provided on an "AS IS" and "AS AVAILABLE" basis. The website is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.' }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 99,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "HearHear its subsidiaries, affiliates, and its licensors do not warrant that a) the website will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the website is free of viruses or other harmful components; or d) the results of using the website will meet your requirements." }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 106,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Governing Law" }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 114,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "These terms shall be governed and construed in accordance with the laws of the Netherlands, without regard to its conflict of law provisions." }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "Our failure to enforce any right or provision of these terms will not be considered a waiver of those rights. If any provision of these terms is held to be invalid or unenforceable by a court, the remaining provisions of these terms will remain in effect. These terms constitute the entire agreement between us regarding our website, and supersede and replace any prior agreements we might have between us regarding the website." }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 119,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Changes" }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 127,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion." }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 128,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Contact Us" }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 134,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-gray-700 mb-4 leading-7", children: "If you have any questions about these terms, please contact us." }, void 0, !1, {
      fileName: "app/routes/terms.tsx",
      lineNumber: 135,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/terms.tsx",
    lineNumber: 9,
    columnNumber: 5
  }, this);
}

// app/routes/api.tsx
var api_exports = {};
__export(api_exports, {
  action: () => action5
});
var import_node11 = require("@remix-run/node"), action5 = async ({ request }) => {
  var _a, _b, _c, _d;
  let data = await request.formData(), requestType = JSON.parse(((_a = data.get("requestType")) == null ? void 0 : _a.toString()) || ""), guildId = JSON.parse(((_b = data.get("guildId")) == null ? void 0 : _b.toString()) || ""), channelId = JSON.parse(((_c = data.get("channelId")) == null ? void 0 : _c.toString()) || ""), meetingId = JSON.parse(((_d = data.get("meetingId")) == null ? void 0 : _d.toString()) || ""), json4 = await (await fetch("https://worker.xipu-li5458.workers.dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      requestType,
      guildId,
      channelId,
      meetingId
    })
  })).json();
  return new import_node11.Response(JSON.stringify(json4), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

// app/routes/new.tsx
var new_exports = {};
__export(new_exports, {
  default: () => NewUser
});
var import_react26 = require("@remix-run/react"), import_jsx_dev_runtime27 = require("react/jsx-dev-runtime");
function NewUser() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("div", { className: "flex justify-center items-center flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("h1", { className: "text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl mx-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("span", { className: "block", children: 'Wow, seems like you are new here! If you have just recorded a meeting, you can click "get started" below to visit the dashboard.' }, void 0, !1, {
      fileName: "app/routes/new.tsx",
      lineNumber: 7,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/new.tsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)(import_react26.Form, { action: "/auth/discord", method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("button", { className: "bg-black hover:bg-gray-800 text-white font-bold py-4 px-4 rounded mt-5 border-white border-2", children: "\u2728 get started \u2728" }, void 0, !1, {
      fileName: "app/routes/new.tsx",
      lineNumber: 13,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/new.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/new.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "0ac456ac", entry: { module: "/build/entry.client-RZLXO7II.js", imports: ["/build/_shared/chunk-NGO2Q4XM.js", "/build/_shared/chunk-ARYQK22N.js", "/build/_shared/chunk-AAZ33T2Z.js", "/build/_shared/chunk-CUPSZOF3.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-4CJ2ZRGC.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-2EQFCDVN.js", imports: ["/build/_shared/chunk-ZLSDYXKO.js", "/build/_shared/chunk-MY5QWXBO.js", "/build/_shared/chunk-C7F7NDP2.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api": { id: "routes/api", parentId: "root", path: "api", index: void 0, caseSensitive: void 0, module: "/build/routes/api-DALEO65J.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth.discord": { id: "routes/auth.discord", parentId: "root", path: "auth/discord", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.discord-WJGD4PRN.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth.discord.callback": { id: "routes/auth.discord.callback", parentId: "routes/auth.discord", path: "callback", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.discord.callback-ZZWGIKQB.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth.discord.logout": { id: "routes/auth.discord.logout", parentId: "routes/auth.discord", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.discord.logout-KTH4CROK.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard": { id: "routes/dashboard", parentId: "root", path: "dashboard", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard-EASJ2ROY.js", imports: ["/build/_shared/chunk-INZJGYT5.js", "/build/_shared/chunk-GWAJ7UPQ.js", "/build/_shared/chunk-MY5QWXBO.js", "/build/_shared/chunk-LPMMDFSI.js", "/build/_shared/chunk-C7F7NDP2.js", "/build/_shared/chunk-W5IRXHEL.js", "/build/_shared/chunk-RO5ECSHB.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard._index": { id: "routes/dashboard._index", parentId: "routes/dashboard", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/dashboard._index-XSPUXDAP.js", imports: ["/build/_shared/chunk-6ZRK7WQ7.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard.guilds.$guild": { id: "routes/dashboard.guilds.$guild", parentId: "routes/dashboard", path: "guilds/:guild", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard.guilds.$guild-NV57V2IJ.js", imports: ["/build/_shared/chunk-2H2LLXPL.js", "/build/_shared/chunk-6ZRK7WQ7.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard.guilds.$guild.meetings.$meeting": { id: "routes/dashboard.guilds.$guild.meetings.$meeting", parentId: "routes/dashboard.guilds.$guild", path: "meetings/:meeting", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard.guilds.$guild.meetings.$meeting-MHXAOJIV.js", imports: ["/build/_shared/chunk-INZJGYT5.js", "/build/_shared/chunk-GWAJ7UPQ.js", "/build/_shared/chunk-MY5QWXBO.js", "/build/_shared/chunk-C7F7NDP2.js", "/build/_shared/chunk-F5VQJM3F.js", "/build/_shared/chunk-RO5ECSHB.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard.guilds.$guild.meetings._index": { id: "routes/dashboard.guilds.$guild.meetings._index", parentId: "routes/dashboard.guilds.$guild", path: "meetings", index: !0, caseSensitive: void 0, module: "/build/routes/dashboard.guilds.$guild.meetings._index-JZZCERBV.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard.guilds._index": { id: "routes/dashboard.guilds._index", parentId: "routes/dashboard", path: "guilds", index: !0, caseSensitive: void 0, module: "/build/routes/dashboard.guilds._index-E7Q66QFE.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-V4RODW7N.js", imports: ["/build/_shared/chunk-ZLSDYXKO.js", "/build/_shared/chunk-C7F7NDP2.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/new": { id: "routes/new", parentId: "root", path: "new", index: void 0, caseSensitive: void 0, module: "/build/routes/new-RYJPUENT.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/privacy": { id: "routes/privacy", parentId: "root", path: "privacy", index: void 0, caseSensitive: void 0, module: "/build/routes/privacy-T4V2DBJI.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/terms": { id: "routes/terms", parentId: "root", path: "terms", index: void 0, caseSensitive: void 0, module: "/build/routes/terms-RPRJNZUP.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/transcript.$transcript": { id: "routes/transcript.$transcript", parentId: "root", path: "transcript/:transcript", index: void 0, caseSensitive: void 0, module: "/build/routes/transcript.$transcript-AIOFREF5.js", imports: ["/build/_shared/chunk-W5IRXHEL.js", "/build/_shared/chunk-F5VQJM3F.js", "/build/_shared/chunk-RO5ECSHB.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/transcript._index": { id: "routes/transcript._index", parentId: "root", path: "transcript", index: !0, caseSensitive: void 0, module: "/build/routes/transcript._index-3WUFSE5L.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, hmr: void 0, url: "/build/manifest-0AC456AC.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !1, unstable_postcss: !1, unstable_tailwind: !0, unstable_vanillaExtract: !1, v2_errorBoundary: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/dashboard.guilds.$guild.meetings.$meeting": {
    id: "routes/dashboard.guilds.$guild.meetings.$meeting",
    parentId: "routes/dashboard.guilds.$guild",
    path: "meetings/:meeting",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_guilds_guild_meetings_meeting_exports
  },
  "routes/dashboard.guilds.$guild.meetings._index": {
    id: "routes/dashboard.guilds.$guild.meetings._index",
    parentId: "routes/dashboard.guilds.$guild",
    path: "meetings",
    index: !0,
    caseSensitive: void 0,
    module: dashboard_guilds_guild_meetings_index_exports
  },
  "routes/dashboard.guilds.$guild": {
    id: "routes/dashboard.guilds.$guild",
    parentId: "routes/dashboard",
    path: "guilds/:guild",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_guilds_guild_exports
  },
  "routes/dashboard.guilds._index": {
    id: "routes/dashboard.guilds._index",
    parentId: "routes/dashboard",
    path: "guilds",
    index: !0,
    caseSensitive: void 0,
    module: dashboard_guilds_index_exports
  },
  "routes/transcript.$transcript": {
    id: "routes/transcript.$transcript",
    parentId: "root",
    path: "transcript/:transcript",
    index: void 0,
    caseSensitive: void 0,
    module: transcript_transcript_exports
  },
  "routes/auth.discord.callback": {
    id: "routes/auth.discord.callback",
    parentId: "routes/auth.discord",
    path: "callback",
    index: void 0,
    caseSensitive: void 0,
    module: auth_discord_callback_exports
  },
  "routes/auth.discord.logout": {
    id: "routes/auth.discord.logout",
    parentId: "routes/auth.discord",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: auth_discord_logout_exports
  },
  "routes/transcript._index": {
    id: "routes/transcript._index",
    parentId: "root",
    path: "transcript",
    index: !0,
    caseSensitive: void 0,
    module: transcript_index_exports
  },
  "routes/dashboard._index": {
    id: "routes/dashboard._index",
    parentId: "routes/dashboard",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: dashboard_index_exports
  },
  "routes/auth.discord": {
    id: "routes/auth.discord",
    parentId: "root",
    path: "auth/discord",
    index: void 0,
    caseSensitive: void 0,
    module: auth_discord_exports
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_exports
  },
  "routes/privacy": {
    id: "routes/privacy",
    parentId: "root",
    path: "privacy",
    index: void 0,
    caseSensitive: void 0,
    module: privacy_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/terms": {
    id: "routes/terms",
    parentId: "root",
    path: "terms",
    index: void 0,
    caseSensitive: void 0,
    module: terms_exports
  },
  "routes/api": {
    id: "routes/api",
    parentId: "root",
    path: "api",
    index: void 0,
    caseSensitive: void 0,
    module: api_exports
  },
  "routes/new": {
    id: "routes/new",
    parentId: "root",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
