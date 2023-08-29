"use client";

import { TableColumnNames, Tables } from "@/lib/tables.types";
import { recordToIter } from "@/utils";
import { useMemo, useState } from "react";
import { Table } from "ui";

type LeaderboardColumns = Exclude<TableColumnNames<"profiles">, "id" | "email">;
type SortableColumns = Exclude<LeaderboardColumns, "username">;

const nonSortableDisplayNames: Record<Exclude<LeaderboardColumns, SortableColumns>, string> = {
  username: "Username",
};
const sortableDisplayNames: Record<SortableColumns, string> = {
  enemies_killed_total: "Enemies Killed",
  waves_completed_total: "Waves Completed",
  accuracy_avg: "Accuracy",
  words_per_minute_avg: "WPM",
  score_total: "Score",
};

const displayNames: Record<LeaderboardColumns, string> = {
  ...nonSortableDisplayNames,
  ...sortableDisplayNames,
};

function formatDataPoint(columnName: TableColumnNames<"profiles">, profile: Tables<"profiles">) {
  if (columnName === "accuracy_avg") {
    return `${Math.floor(profile[columnName] * 100)}%`;
  }

  if (columnName === "words_per_minute_avg") {
    return profile[columnName].toFixed(2);
  }

  return profile[columnName];
}

export function Leaderboard({ profiles }: { profiles: Tables<"profiles">[] }) {
  const [sortedBy, setSortedBy] = useState<SortableColumns>("enemies_killed_total");

  const sortedProfiles = useMemo(
    () => profiles.sort((a, b) => b[sortedBy] - a[sortedBy]),
    [sortedBy, profiles],
  );

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          {recordToIter(nonSortableDisplayNames).map(([_, value]) => (
            <Table.HeaderData key={value}>{value}</Table.HeaderData>
          ))}
          {recordToIter(sortableDisplayNames).map(([key, value]) => (
            <Table.HeaderData
              key={value}
              onClick={() => {
                setSortedBy(key);
              }}
            >
              <p>{value}</p>
            </Table.HeaderData>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {sortedProfiles.map(profile => (
          <Table.Row key={profile.id}>
            {Object.keys(displayNames).map(key => (
              <Table.Data key={key}>
                {formatDataPoint(key as TableColumnNames<"profiles">, profile)}
              </Table.Data>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
