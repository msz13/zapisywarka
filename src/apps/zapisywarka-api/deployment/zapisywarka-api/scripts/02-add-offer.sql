START TRANSACTION;

CREATE SCHEMA IF NOT EXISTS reservations;

CREATE TABLE reservations.offers (
    "Id" uuid NOT NULL,
    CONSTRAINT "PK_offers" PRIMARY KEY ("Id")
);

CREATE TABLE reservations.offer_items (
    position integer NULL,
    offer_id uuid NOT NULL,
    name text NOT NULL,
    CONSTRAINT "PK_offer_items" PRIMARY KEY (position, offer_id),
    CONSTRAINT "FK_offer_items_offers_offer_id" FOREIGN KEY (offer_id) REFERENCES reservations.offers ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_offer_items_offer_id" ON reservations.offer_items (offer_id);


COMMIT;

