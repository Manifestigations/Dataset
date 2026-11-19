/* The vocabulary. Ids are stable and are the join key of the register; the
   two strings are authored in each language, never translated from the other. */

import type { Bi } from "../../copy/index.ts";
import type { ActCategory, ActUnit } from "./types.ts";

export interface ActCategoryDef {
  readonly id: ActCategory;
  readonly unit: ActUnit;
  readonly title: Bi;
  readonly def: Bi;
}

export const ACT_CATEGORIES: readonly ActCategoryDef[] = [
  {
    id: "marchRally",
    unit: "actions",
    title: {
      en: "March, cortège or rally",
      fr: "Manifestation, cortège ou rassemblement",
    },
    def: {
      en: "A procession or static gathering on the public highway, whether or not it was declared.",
      fr: "Cortège ou rassemblement statique sur la voie publique, déclaré ou non.",
    },
  },
  {
    id: "roadBlockade",
    unit: "actions",
    title: { en: "Road blockade", fr: "Blocage routier" },
    def: {
      en: "A carriageway, roundabout, motorway, slip road or bridge held or blocked — including a filter barrage that stops traffic.",
      fr: "Chaussée, rond-point, autoroute, bretelle ou pont occupé ou bloqué — barrage filtrant qui arrête la circulation compris.",
    },
  },
  {
    id: "tollFree",
    unit: "actions",
    title: { en: "Opération péage gratuit", fr: "Opération péage gratuit" },
    def: {
      en: "A toll barrier lifted so that the toll is not collected. Kept separate from road blockade: the road stays open, the payment is refused.",
      fr: "Barrière de péage levée pour que le péage ne soit pas acquitté. Distinct du blocage routier : la route reste ouverte, le paiement est refusé.",
    },
  },
  {
    id: "fuelAction",
    unit: "actions",
    title: { en: "Fuel action", fr: "Action carburants" },
    def: {
      en: "A service station, fuel depot or refinery picketed, drained, closed or forced to sell at a lower price; the pump-price and margin operations.",
      fr: "Station-service, dépôt de carburant ou raffinerie filtré, vidé, fermé ou contraint de vendre à prix réduit ; opérations prix à la pompe et marges.",
    },
  },
  {
    id: "transportHub",
    unit: "actions",
    title: { en: "Transport hub", fr: "Nœud de transport" },
    def: {
      en: "A railway station, port, airport or metro entrance occupied, blocked or shut by the movement.",
      fr: "Gare, port, aéroport ou accès au métro occupé, bloqué ou fermé par le mouvement.",
    },
  },
  {
    id: "siteOccupation",
    unit: "actions",
    title: { en: "Public building occupied", fr: "Bâtiment public occupé" },
    def: {
      en: "A town hall, prefecture, departmental council, assembly or ministry occupied, invaded or picketed.",
      fr: "Mairie, préfecture, conseil départemental, assemblée ou ministère occupé, envahi ou filtré.",
    },
  },
  {
    id: "schoolBlockade",
    unit: "establishments",
    title: {
      en: "School or university blockade",
      fr: "Blocage d'établissement scolaire ou universitaire",
    },
    def: {
      en: "An establishment where pupils or students could not be received normally — blocked, or closed by decision. This is the existing blockades metric, re-projected unchanged; the union ceiling also counts schools closed administratively, which is why the band is wide.",
      fr: "Établissement où les élèves ou étudiants n'ont pas pu être accueillis normalement — bloqué, ou fermé par décision. C'est la métrique blockades existante, reprise telle quelle ; le plafond syndical compte aussi les fermetures administratives, d'où la largeur de la fourchette.",
    },
  },
  {
    id: "sabotage",
    unit: "actions",
    title: { en: "Sabotage", fr: "Sabotage" },
    def: {
      en: "Deliberate disabling or destruction of property: arson, wrecked premises, cut cables, a device placed. Damage to people is never in this row.",
      fr: "Neutralisation ou destruction volontaire de biens : incendie, locaux saccagés, câbles sectionnés, engin posé. Les atteintes aux personnes ne sont jamais dans cette ligne.",
    },
  },
  {
    id: "vandalism",
    unit: "premises",
    title: { en: "Premises hit or degraded", fr: "Locaux touchés ou dégradés" },
    def: {
      en: "Premises reported damaged short of pillage — shopfronts, vehicles, street furniture. A count of premises, not of acts: one group can hit fifty in a street.",
      fr: "Locaux signalés dégradés sans pillage — devantures, véhicules, mobilier urbain. Un décompte de locaux, non d'actes : un groupe peut en toucher cinquante dans une rue.",
    },
  },
  {
    id: "looting",
    unit: "premises",
    title: { en: "Premises pillaged", fr: "Locaux pillés" },
    def: {
      en: "Premises entered and emptied. A separate category from degradation because publishers report the two separately, and the counts never sum to the total of premises hit.",
      fr: "Locaux ouverts et vidés. Catégorie distincte des dégradations parce que les sources publient les deux séparément, et que leur somme ne donne jamais le total des locaux touchés.",
    },
  },
  {
    id: "clashWithPolice",
    unit: "incidents",
    title: { en: "Clash with the forces", fr: "Affrontement avec les forces" },
    def: {
      en: "A confrontation: projectiles thrown, barricades built, a charge. An incident count, not a crowd count, and not an injury count.",
      fr: "Une confrontation : jets de projectiles, barricades édifiées, charge. Un décompte d'incidents, ni de foule ni de blessés.",
    },
  },
  {
    id: "premisesHit",
    unit: "premises",
    title: {
      en: "Premises hit, cause unstated",
      fr: "Locaux touchés, cause non précisée",
    },
    def: {
      en: "Premises reported hit without the publisher separating degradation from pillage. A count of premises, and a superset of both rows below — never added to them.",
      fr: "Locaux signalés touchés sans que la source sépare dégradation et pillage. Un décompte de locaux, et un sur-ensemble des deux lignes suivantes — jamais additionné à elles.",
    },
  },
];

/** Lookup by id. Frozen at module load; a duplicate id throws. */
export const ACT_CATEGORY_OF: ReadonlyMap<ActCategory, ActCategoryDef> =
  (() => {
    const m = new Map<ActCategory, ActCategoryDef>();
    for (const c of ACT_CATEGORIES) {
      if (m.has(c.id))
        throw new Error(`categories.ts: duplicate category "${c.id}"`);
      m.set(c.id, c);
    }
    return m;
  })();
