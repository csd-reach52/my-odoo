process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const https = require("https");
const fs = require("fs");
const { parse } = require("csv-parse");

const HOST = "localhost";
const PORT = 443;
const RPC_PATH = "/json-rpc/";

let cookieJar = "";

function jsonRpcCall(method, params) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: Date.now()
    });

    const options = {
      hostname: HOST,
      port: PORT,
      path: RPC_PATH,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
        "Cookie": cookieJar || "",
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", chunk => { data += chunk; });
      res.on("end", () => {
        try {
          if (res.headers["set-cookie"]) {
            cookieJar = res.headers["set-cookie"].join("; ");
          }
          const parsed = JSON.parse(data);
          if (parsed.error) {
            reject(new Error(`JSON-RPC Error in ${method}: ${parsed.error.message || JSON.stringify(parsed.error)}`));
          } else {
            resolve(parsed.result);
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

async function migrate() {
  try {
    console.log("--- Starting Migration (JSON-RPC) ---");

    await jsonRpcCall("Auth.login", ["csiandal", "csiandal;"]);
    console.log("Logged in successfully.");

    // Create Test Plan
    const planData = {
      name: `X Migration Plan - ${new Date().toLocaleDateString()}`,
      product: 2,
      product_version: 5,
      type: 1,
    };

    const planResult = await jsonRpcCall("TestPlan.create", [planData]);
    const planId = planResult.id;   // Correct way to get the ID
    console.log(`✅ Test Plan created successfully. ID: ${planId}`);

    // Import Test Cases from CSV
    const parser = fs.createReadStream("./test_cases.csv")
                     .pipe(parse({ columns: true, skip_empty_lines: true }));

    for await (const record of parser) {
      const caseData = {
        summary: record.summary,
        text: record.description || "No description provided.",
        expected_results: record.expected || "",
        category: 1,          // ← Change if needed
        priority: 1,          // ← Change if needed
        product: 2,
        case_status: 2,       // ← REQUIRED! 2 = CONFIRMED
      };

      const caseResult = await jsonRpcCall("TestCase.create", [caseData]);
      const caseId = caseResult.id;

      console.log(`✅ Test Case created: "${record.summary}" (ID: ${caseId})`);

      // Link case to the plan
      await jsonRpcCall("TestPlan.add_case", [planId, caseId]);
      console.log(`   → Linked to plan ${planId}`);
    }

    console.log("\n--- Migration Completed Successfully! ---");
  } catch (err) {
    console.error("\nMigration Failed:");
    console.error(err.message || err);
  }
}

migrate();