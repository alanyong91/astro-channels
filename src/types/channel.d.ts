interface CurrentScheduleType {
  datetime: string;
  datetimeInUtc: string;
  detailUrl: string;
  duration: string;
  episodeId: string | null;
  eventId: string;
  programmeId: string | null;
  siTrafficKey: string;
  title: string;
}

interface SchedulerType {
  datetime: string | null;
  duration: string | null;
  episodeId: string | null;
  eventId: string | null;
  programmeId: string | null;
  title: string | null;
}

interface ChannelType {
  backupImage: string;
  category: string;
  currentSchedule: CurrentScheduleType[];
  schedulers: SchedulerType[];
  description: string;
  detailUrl: string;
  filter: string[];
  id: number;
  imageUrl: string;
  isAstroGoExclusive: boolean;
  isHd: boolean;
  language: string;
  originalImage: string;
  stbNumber: string;
  title: string;
}

interface FilteredChannelType extends ChannelType {
  bookmarked: boolean;
}

interface ChannelDetailType {
  backupImage: string;
  category: string;
  description: string;
  filters: string[];
  id: number;
  imageUrl: string;
  isAstroGoExclusive: boolean;
  isHd: boolean;
  language: string;
  originalImage: string;
  schedule: {
    [date: string]: SchedulerType[]
  };
  stbNumber: string;
  title: string;
}

type sortedBy = 'channelNumber' | 'channelName' | null;
type orderBy = 'asc' | 'desc'

type sortByData = {
  key: string;
  value: sortedBy;
  name: string
}

interface ChannelFilterType {
  keyword: string;
  category: string;
  language: string;
  isHd: boolean;
  sortedBy: sortedBy;
  orderBy: orderBy;
}

interface FilterFormProps {
  categories: string[];
  languages: string[];
  filter: ChannelFilterType;
  setFilter: React.Dispatch<React.SetStateAction<ChannelFilterType>>;
}

interface ChannelHeaderProps {
  imageUrl: string;
  title: string;
  stbNumber: string;
}

interface ScheduleListProps {
  schedulers: SchedulerType[];
  needFilter?: boolean;
  itemExtraClass?: string;
}