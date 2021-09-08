package db

import com.google.protobuf.util.JsonFormat

val JsonPrinter : JsonFormat.Printer = JsonFormat.printer()
    .omittingInsignificantWhitespace()
    .printingEnumsAsInts()

val JsonParser : JsonFormat.Parser = JsonFormat.parser()
    .ignoringUnknownFields()

