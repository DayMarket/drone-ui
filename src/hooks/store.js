import Dexie from 'dexie';
import create from 'zustand';
import audioSrc from "../assets/sounds/ranetki.mp3"


import {audio, axiosWrapper} from 'utils';

// helper function that returns an object of unique repos and unique orgs
const createSet = (input) => {
  const repos = {};
  const orgs = new Set();
  input.forEach((repo) => {
    repos[repo.slug] = repo;
    orgs.add(repo.namespace);
  });
  return { repos, orgs: [...orgs] };
};

const db = new Dexie('repositories');
db.version(1).stores({
  repository: '++id, uid, slug, org',
});


async function setInCache(repoSet, orgs) {
  const table = db.repository;

  for await (const [key, value] of Object.entries(repoSet)) {
    await table.add({
      slug: key,
      id: value.id,
      uid: value.uid,
      ...value,
    });
  }
}

export const useStore = create((set, get) => ({
  cache: {},
  repos: undefined,
  orgs: undefined,
  error: undefined,
  fired: false,

  update: (repo) => {
    const { repos } = get();
    if (repos && repos[repo.slug]) {
      const newRepos = repos;
      newRepos[repo.slug] = repo;
      set((state) => ({
        repos: newRepos,
        ...state,
      }));
    }
  },
  
  reload: async () => {
    const table = db.repository;
    await table.clear();

    const repos = await axiosWrapper('/api/user/repos?latest=true', {
      method: 'GET',
    });

    const { repos: repoSet, orgs } = createSet(repos);

    await setInCache(repoSet, orgs);
    
    audio.pause();

    set((state) => ({
      ...state,
      repos: repoSet,
      orgs,
      error: undefined,
    }));
  },

  reloadOnce: async () => {
    // exit early if the request for the repository
    // list has already been fired.
    if (get().fired) {
      return;
    }
    
    set((state) => ({
      ...state,
      fired: true,
    }));

    const table = db.repository;
    const cacheRepositories = await table.toArray();

    if (cacheRepositories.length) {
      set((state) => ({
        ...state,
        repos: cacheRepositories,
        orgs: ['DayMarket'],
        error: undefined,
      }));
      console.log('GET FROM CACHE');
      return;
    }
    
    audio.play();

    const repos = await axiosWrapper('/api/user/repos?latest=true', {
      method: 'GET',
    });

    const { repos: repoSet, orgs } = createSet(repos);

    await setInCache(repoSet, orgs);
    
    
    audio.pause();
    set((state) => ({
      ...state,
      repos: repoSet,
      orgs,
      error: undefined,
    }));
  },
}));
