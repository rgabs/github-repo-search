const formatDate = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const processRepos = ({ id, name, owner, stargazers_count, created_at }) => ({
  id,
  name,
  stargazers_count,
  owner: owner.login,
  created_at: formatDate(created_at),
  createdTimeStamp: Date.parse(created_at)
})

export const getCachedReposForInput = (cached, inputString) => cached.searchStringsMap[inputString.toLowerCase()]
  .map((repoID) => cached.allRepos[repoID])