#include <WiFi.h>
#include <HTTPClient.h>
#include <Adafruit_Fingerprint.h>

#define RX_PIN 16
#define TX_PIN 17
#define LED_VERDE 4
#define LED_VERMELHO 5

Adafruit_Fingerprint finger = Adafruit_Fingerprint(&Serial2);

const char* ssid = "Augusto camati";
const char* password = "12345678";
const char* api_url = "http://seu-servidor.com/validar";

void setup() {
    Serial.begin(115200);
    Serial2.begin(57600, SERIAL_8N1, RX_PIN, TX_PIN);
    
    pinMode(LED_VERDE, OUTPUT);
    pinMode(LED_VERMELHO, OUTPUT);
    
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nWiFi conectado!");
    
    finger.begin(57600);
    if (finger.verifyPassword()) {
        Serial.println("Sensor biométrico detectado.");
    } else {
        Serial.println("Erro no sensor biométrico!");
        while (1);
    }
}

void loop() {
    int id = getFingerprintID();
    if (id > 0) {
        Serial.print("ID detectado: ");
        Serial.println(id);
       // validarAcesso(id);
    }
    delay(2000);
}

int getFingerprintID() {
    if (finger.getImage() != FINGERPRINT_OK) return -1;
    if (finger.image2Tz() != FINGERPRINT_OK) return -1;
    if (finger.fingerFastSearch() != FINGERPRINT_OK) return -1;
    return finger.fingerID;
}

void validarAcesso(int id) {
    HTTPClient http;
    String url = String(api_url) + "?id=" + id;
    
    http.begin(url);
    int httpCode = http.GET();
    
    if (httpCode == 200) {
        String resposta = http.getString();
        if (resposta == "permitido") {
            digitalWrite(LED_VERDE, HIGH);
            digitalWrite(LED_VERMELHO, LOW);
        } else {
            digitalWrite(LED_VERDE, LOW);
            digitalWrite(LED_VERMELHO, HIGH);
        }
    }
    http.end();
}
