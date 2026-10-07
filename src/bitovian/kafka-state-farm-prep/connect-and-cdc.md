@page bitovian/kafka-state-farm-prep/connect-and-cdc Kafka Connect and Change Data Capture
@parent bitovian/kafka-state-farm-prep 10
@outline 2

@description Learn how Kafka Connect runs connectors, how change data capture copies every database change into Kafka, what a change event looks like, and how CDC data lands in a lakehouse's bronze layer.

@body

## Overview

In this section, we will:

- Review how Kafka Connect runs source and sink connectors
- Learn what change data capture (CDC) is, and why reading the database's log is the usual way to do it
- Read a change event, field by field
- See where CDC data often ends up: the bronze layer of a lakehouse

## Kafka Connect, briefly

In the Kafka Connect lesson of Kafka 101, you moved data between Kafka and another system without writing code. The [Kafka docs](https://kafka.apache.org/42/kafka-connect/overview/) describe Connect as "a tool for scalably and reliably streaming data between Apache Kafka and other systems."

A few terms to know:

- A **source connector** reads from another system and writes to Kafka. A **sink connector** reads from Kafka and writes to another system.
- Connectors run inside **Connect workers**, a service separate from the Kafka brokers.
- Workers run in one of [two modes](https://kafka.apache.org/42/kafka-connect/user-guide/). In **distributed** mode, several workers share the work and "Kafka Connect stores the offsets, configs and task statuses in Kafka topics." **Standalone** mode runs everything in a single process.

The dead letter queue settings from the Retries section are part of Connect, for sink connectors.

## Change data capture

**Change data capture** (CDC) copies every insert, update, and delete in a database into Kafka as it happens. Other systems then read the changes from Kafka, instead of each one querying the database.

There are a few ways to find out what changed. You can poll for rows with a newer "last updated" time, or have the application write to both the database and Kafka. The most common approach reads the database's own transaction log, the record every database keeps of each change it makes. This is called **log-based CDC**.

[Debezium](https://debezium.io/documentation/reference/stable/features.html), a widely used open-source CDC tool, lists what log-based CDC gives you over polling or dual writes. It:

- "Ensures that all data changes are captured"
- Produces change events quickly, without the extra load of frequent polling
- "Requires no changes to your data model, such as a 'Last Updated' column"
- "Can capture deletes"

Debezium usually runs as a set of source connectors in Kafka Connect. Its [architecture docs](https://debezium.io/documentation/reference/stable/architecture.html) say "By default, changes from one database table are written to a Kafka topic whose name corresponds to the table name."

Commercial tools do the same job. [IBM Data Replication](https://www.ibm.com/products/data-replication), for example, lists Kafka as one of its targets, and its sources include mainframe data stores such as Db2 for z/OS, VSAM, and IMS, alongside databases like Oracle, SQL Server, and PostgreSQL. The shape of the change events differs from tool to tool, so read the tool's docs for the exact format.

## A change event

Debezium's change events are a common example of what CDC data looks like. Each event's value has the row before and after the change, and an `op` field saying what happened. The [PostgreSQL connector docs](https://debezium.io/documentation/reference/stable/connectors/postgresql.html) list its values:

<table>
  <thead>
    <tr><th><code>op</code></th><th>Meaning</th></tr>
  </thead>
  <tbody>
    <tr><td><code>c</code></td><td>A row was created</td></tr>
    <tr><td><code>u</code></td><td>A row was updated</td></tr>
    <tr><td><code>d</code></td><td>A row was deleted</td></tr>
    <tr><td><code>r</code></td><td>A row was read during a snapshot</td></tr>
    <tr><td><code>t</code></td><td>A table was truncated</td></tr>
  </tbody>
</table>

Three things about CDC events are worth knowing before you consume them:

- **They describe rows, not business events.** "The `status` column of row 42 changed" is a database detail. Consumers often turn it into something meaningful, like "a claim was approved," before other teams use it.
- **A new connector usually starts with a snapshot.** A Debezium connector, by default, "performs an initial consistent snapshot of the database" the first time it starts. It reads the existing rows as `r` events, then streams changes from the log.
- **The key is usually the row's primary key.** In Debezium, the key "contains a field for each column in the primary key of the table." So all changes to one row go to the same partition, and they're read in order.

## Landing CDC data in a lakehouse

A common destination for CDC data is a lakehouse: a data platform that stores tables as files and supports both analytics and machine learning. Databricks is one, and it describes a layered design called the [medallion architecture](https://docs.databricks.com/aws/en/lakehouse/medallion), with bronze, silver, and gold layers.

CDC data from Kafka usually lands first in the **bronze** layer. The Databricks docs say bronze data:

- "Contains and maintains the raw state of the data source in its original formats"
- "Is appended incrementally and grows over time"
- "Enables reprocessing and auditing by retaining all historical data"

Later steps clean and validate the data into silver tables, then aggregate it into gold tables for reports. On Databricks, [Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/) is the governance layer over all of these tables. Its docs call it "the unified governance layer for data and AI built into Databricks," handling access control, lineage, and auditing.

Because bronze keeps the raw history, a mistake further down the pipeline can be fixed by reprocessing from bronze, much like replaying a Kafka topic.

## Next steps

Next, we'll cover a few shorter topics that are useful to know: Multi-Region Clusters, back pressure, and circuit breakers.
