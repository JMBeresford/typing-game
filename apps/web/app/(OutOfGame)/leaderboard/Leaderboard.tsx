"use client";

import { TableColumnNames, Tables } from "@/lib/tables.types";
import { recordToIter } from "@/utils";
import { useMemo, useState, useCallback } from "react";
import { Table } from "ui";
import styles from "./page.module.scss";
import Link from "next/link";

type LeaderboardColumns = Exclude<TableColumnNames<"profiles">, "id" | "email">;
type SortableColumns = Exclude<LeaderboardColumns, "username">;
type SortDirection = "asc" | "desc";

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

  if (columnName === "username") {
    return <Link href={`/profile/${profile.username}`}>{profile[columnName]}</Link>;
  }

  return profile[columnName];
}

export function Leaderboard({ profiles }: { profiles: Tables<"profiles">[] }) {
  const [sortedBy, setSortedBy] = useState<SortableColumns>("enemies_killed_total");
  const [sortDirection, setSortDirection] = useState<Record<SortableColumns, SortDirection>>({
    enemies_killed_total: "desc",
    waves_completed_total: "desc",
    accuracy_avg: "desc",
    words_per_minute_avg: "desc",
    score_total: "desc",
  });

  const sortedProfiles = useMemo(
    () =>
      sortDirection[sortedBy] === "asc"
        ? profiles.sort((a, b) => a[sortedBy] - b[sortedBy])
        : profiles.sort((a, b) => b[sortedBy] - a[sortedBy]),
    [sortedBy, profiles, sortDirection],
  );

  const handleClick = useCallback(
    (columnName: SortableColumns) => {
      if (columnName === sortedBy) {
        setSortDirection(prev => ({
          ...prev,
          [columnName]: prev[columnName] === "asc" ? "desc" : "asc",
        }));
      } else {
        setSortedBy(columnName);
      }
    },
    [sortedBy],
  );

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderData></Table.HeaderData>
          {recordToIter(nonSortableDisplayNames).map(([_, value]) => (
            <Table.HeaderData key={value}>{value}</Table.HeaderData>
          ))}
          {recordToIter(sortableDisplayNames).map(([key, value]) => (
            <Table.HeaderData key={value} className={sortedBy === key ? styles.selectedColumn : ""}>
              <div
                onClick={() => {
                  handleClick(key);
                }}
                className={styles.sortableColumnValue}
              >
                <p>{value}</p>
                <p className={sortDirection[key] === "asc" ? styles.ascending : ""}>▼</p>
              </div>
            </Table.HeaderData>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {sortedProfiles.map((profile, idx) => (
          <Table.Row key={profile.id}>
            <Table.Data>{idx + 1}</Table.Data>
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
