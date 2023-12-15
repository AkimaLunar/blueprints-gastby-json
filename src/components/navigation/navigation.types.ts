export type MainNavigationCollectionKeys = keyof MainNavigationCollectionsQuery;
export type MainNavigationCollectionsQuery = {
  guidance: {
    nodes: {
      _path: string;
      title: string;
    }[];
  };
  components: {
    nodes: {
      _path: string;
      title: string;
    }[];
  };
};

export type MainNavigationItem = {
  title: string;
  id: string;
  linkProps: {
    to: string;
  };
};

export type MainNavigationCollection = {
  collection: string;
  collectionId: MainNavigationCollectionKeys;
  exclude?: string[];
  include?: string[];
  order?: 'alphabetical' | 'chronological';
};

export type MainNavigationHeader = {
  title: string;
  items: MainNavigationItemType[];
  hasDivider?: boolean;
};

export type MainNavigationItemType = MainNavigationItem | MainNavigationCollection | MainNavigationHeader;

export type MainNavigationConfig = MainNavigationItemType[];

export type NavigationQuery = {
  mainNavigationJson: {
    items: MainNavigationItemType[];
  };
};

export type CollectionsQuery = {
  [key: string]: {
    nodes: {
      title: string;
      _path: string;
    }[];
  };
};

export function isMainNavigationCollection(
  item: MainNavigationItemType,
): item is MainNavigationCollection {
  return 'collection' in item;
}

export function isMainNavigationHeader(
  item: MainNavigationItemType,
): item is MainNavigationHeader {
  return 'items' in item;
}

export function isMainNavigationItem(
  item: MainNavigationItemType,
): item is MainNavigationItem {
  return 'linkProps' in item;
}
