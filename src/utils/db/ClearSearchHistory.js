// To clear search history
// Accessed from side drawer (Clear Search History option)

import dropSearchHistoryTable from "./DropSearchHistoryTable";
import createSearchHistoryTable from "./CreateSearchHistoryTable";

const clearSearchHistory = () => {
  dropSearchHistoryTable();
  setTimeout(() => createSearchHistoryTable(), 500);
};

export default clearSearchHistory;
