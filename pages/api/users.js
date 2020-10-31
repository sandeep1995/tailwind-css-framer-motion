import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.AUTH_TOKEN });

const computeEndPoint = (location, language) => {
  let url;
  if (location && !language) {
    url = `GET /search/users?q=location:{location}`;
  } else if (!location && language) {
    url = `GET /search/users?q=language:{language}`;
  } else {
    url = `GET /search/users?q=language:{language}+location:{location}`;
  }
  return url;
};

export default async (req, res) => {
  res.statusCode = 200;

  const { location, language } = req.query;

  const endPoint = computeEndPoint(location, language);

  const { data } = await octokit.request(endPoint, {
    language,
    location,
  });
  res.json(data);
};
