#include <SPI.h>
#include <Ethernet.h>
#include <MySQL_Connection.h>
#include <MySQL_Cursor.h>

#define pinVermelhoLed1 A0
#define pinVerdeLed1 A1
#define pinAzulLed1 A2
#define sensorLed1 A3

#define pinVermelhoLed2 9
#define pinVerdeLed2 8
#define pinAzulLed2 7
#define sensorLed2 6

#define pinVermelhoLed3 5
#define pinVerdeLed3 A4
#define pinAzulLed3 3
#define sensorLed3 2

byte mac_addr[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress server_addr(192, 168, 15, 6);

char user[] = "arduino_uno";
char password[] = "1234";
const char RESERVADO[] = "RESERVADO";
const char DISPONIVEL[] = "DISPONIVEL";
const char INDISPONIVEL[] = "INDISPONIVEL";

EthernetClient client;
MySQL_Connection conn((Client *)&client);

void setup() {
  preparaConexao();
  preparaIO();
}

void loop() {
  delay(1000);
  verificaEstadoLed(sensorLed1, 1, pinVermelhoLed1, pinVerdeLed1, pinAzulLed1);
  verificaEstadoLed(sensorLed2, 2, pinVermelhoLed2, pinVerdeLed2, pinAzulLed2);
  verificaEstadoLed(sensorLed3, 3, pinVermelhoLed3, pinVerdeLed3, pinAzulLed3);
}

void verificaEstadoLed(int sensor, int prateleira, int ledVermelho, int ledVerde, int ledAzul) {
 if (!conn.connected()) {
    Serial.println("Reconectando...");
    conn.close();
    if (conn.connect(server_addr, 3306, user, password)) {
      Serial.println("Reconexão bem sucedida!");
    } else {
      Serial.println("A reconexão falhou");
      delay(1000);
      return;
    }
  }

  const char QUERY_UPDATE[] = "UPDATE liv_db.livro SET Flag = %s WHERE Prateleira = %d";
    char query[128];

  if (digitalRead(sensor) == LOW) { 
    if (verificarReserva(prateleira)) {
      ledReservado(ledVermelho, ledVerde, ledAzul);
    } else {
      ledPresente(ledVermelho, ledVerde, ledAzul);
      atualizarBanco(DISPONIVEL, prateleira);
    }
  } else {
    ledAusente(ledVermelho, ledVerde, ledAzul);
    if (!verificarReserva(prateleira)){
      atualizarBanco(INDISPONIVEL, prateleira);
    } 
    }
}

void preparaConexao() {
  Serial.begin(9600);
  while (!Serial);

  Ethernet.begin(mac_addr);
  delay(1000);

  Serial.println("Conectando...");
  if (conn.connect(server_addr, 3306, user, password)) {
    Serial.println("Conexão bem sucedida!");
    delay(1000);
  } else {
    Serial.println("A conexão falhou");
    conn.close();
  }
}

void preparaIO() {
  pinMode(pinVermelhoLed1, OUTPUT);
  pinMode(pinAzulLed1, OUTPUT);
  pinMode(pinVerdeLed1, OUTPUT);
  pinMode(sensorLed1, INPUT);

  pinMode(pinVermelhoLed2, OUTPUT);
  pinMode(pinAzulLed2, OUTPUT);
  pinMode(pinVerdeLed2, OUTPUT);
  pinMode(sensorLed2, INPUT);

  pinMode(pinVermelhoLed3, OUTPUT);
  pinMode(pinAzulLed3, OUTPUT);
  pinMode(pinVerdeLed3, OUTPUT);
  pinMode(sensorLed3, INPUT);
}

bool verificarReserva(int position) {
  MySQL_Cursor *cur_mem = new MySQL_Cursor(&conn);
  const char QUERY_POP[] = "SELECT Flag FROM liv_db.livro WHERE Prateleira = %d";

  char query[128];
  char status[20];

  sprintf(query, QUERY_POP, position);
  cur_mem->execute(query);
  column_names *columns = cur_mem->get_columns();
  row_values *row = NULL;
  do {
    row = cur_mem->get_next_row();
    if (row != NULL) {
      strcpy(status, row->values[0]);
    }
  } while (row != NULL);
  delete cur_mem;

  if (strcmp(status, RESERVADO) == 0) {
    return true;
  }

  return false;
}

void atualizarBanco(const char *flag, int prateleira) {
  MySQL_Cursor *cur_mem = new MySQL_Cursor(&conn);
  const char QUERY_UPDATE[] = "UPDATE liv_db.livro SET Flag = '%s' WHERE Prateleira = %d";

  char formattedQuery[128];
  sprintf(formattedQuery, QUERY_UPDATE, flag, prateleira);

  if (cur_mem->execute(formattedQuery)) {
    Serial.println("Banco atualizado com sucesso!");
  } else {
    Serial.println("Erro ao atualizar o banco.");
  }

  delete cur_mem;
}

void ledPresente(int ledVermelho, int ledVerde, int ledAzul) {
  digitalWrite(ledVermelho, LOW);
  digitalWrite(ledAzul, LOW);
  digitalWrite(ledVerde, HIGH);
}

void ledReservado(int ledVermelho, int ledVerde, int ledAzul) {
  digitalWrite(ledVermelho, LOW);
  digitalWrite(ledAzul, HIGH);
  digitalWrite(ledVerde, LOW);
}

void ledAusente(int ledVermelho, int ledVerde, int ledAzul) {
  digitalWrite(ledVermelho, HIGH);
  digitalWrite(ledAzul, LOW);
  digitalWrite(ledVerde, LOW);
}