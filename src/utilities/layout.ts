import type {
  QuickResourceCopyTextProps,
  QuickResourceLinkProps,
} from '../components/quick-resource';
import { BasicLayoutProps } from '../layouts/basic';
import { ReferenceLayoutProps } from '../layouts/reference';
import { WorkInProgressLayoutProps } from '../layouts/work-in-progress';
import { JsonPageData } from '../pages/{PagesJson._path}';

function removeNullProperties<T>(obj: T) {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (newObj[key] === null) {
      delete newObj[key];
    }
  }
  return newObj;
}

type FormatDataToPropsReturnValue =
  | {
      key: 'basic';
      props: BasicLayoutProps;
    }
  | {
      key: 'reference';
      props: ReferenceLayoutProps;
    }
  | {
      key: 'work-in-progress';
      props: WorkInProgressLayoutProps;
    }
  | Record<string, never>;

export function formatDataToProps({
  pagesJson: data,
}: JsonPageData): FormatDataToPropsReturnValue {
  const { _layout } = data;

  if (_layout === 'basic') {
    return {
      key: 'basic',
      props: {
        title: data.title,
        leading: data.leading,
        heroImage: {
          alt: data.heroImage?.alt,
          src: {
            publicURL: data.heroImage?.src?.publicURL,
          },
        },
        content: data.content ?? [],
      } as BasicLayoutProps,
    };
  }

  if (_layout === 'reference') {
    const { quickResources = [] } = data;

    const formattedQuickResources = quickResources?.map((resource) =>
      removeNullProperties<QuickResourceCopyTextProps | QuickResourceLinkProps>(resource),
    );

    return {
      key: 'reference',
      props: {
        title: data.title,
        definition: data.definition,
        quickResources: formattedQuickResources,
        owners: data.owners ?? [],
        tabs: data.tabs ?? [],
      } as ReferenceLayoutProps,
    };
  }

  if (_layout === 'work-in-progress') {
    return {
      key: 'work-in-progress',
      props: {
        title: data.title,
        leading: data.leading,
      } as WorkInProgressLayoutProps,
    };
  }

  return {};
}
