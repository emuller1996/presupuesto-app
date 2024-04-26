import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import dotenv from "dotenv";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRETS, URL_CALLBACK } = process.env;
dotenv.config();

passport.use(
  "git-hub",
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRETS,
      callbackURL: URL_CALLBACK,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);
