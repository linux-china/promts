/**
 * Copyright Verizon Media, Licensed under the terms of the MIT license.
 * See LICENSE file in project root for terms.
 */

import { assertThrows, assertEquals } from "https://deno.land/std@0.85.0/testing/asserts.ts";
import { Gauge } from "./gauge.ts";

Deno.test("gauge increment", async (): Promise<void> => {
    const gauge: Gauge = new Gauge("gauge_procs");

    gauge.setRatio(() => {
      return 1;
    })
    assertEquals(gauge.getRatio(), 1);


});


Deno.test("gauge toString()", async (): Promise<void> => {
    const gauge: Gauge = new Gauge("dec_counter", { region: "US" });

    gauge.setRatio(() => {
      return 500;
    })

    assertEquals(gauge.toString(), `dec_counter{region="US"} 500\n`);
});


Deno.test("gauge toString()", async (): Promise<void> => {
    assertThrows(() => {
        new Gauge("hito%%", { region: "US" });
    });

    assertThrows(() => {
        new Gauge("hi2u", { "re|gion": "US" });
    });

});
