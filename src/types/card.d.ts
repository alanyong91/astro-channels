interface CardListProps {
  channels: FilteredChannelType[];
  toggleChannelBookmark: (id: number) => void;
}

interface CardProps {
  channel: FilteredChannelType;
  toggleChannelBookmark: (id: number) => void;
}