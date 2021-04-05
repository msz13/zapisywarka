Feature: Menaging orders

    Scenario: Seler menage orders

        Given Orders <status>
        Then Seler can perform actions

            | status    | action                                                                                       |
            | received  | view, confirm,reject                                                                         |
            | accepted  | view, cencel,update orderitems, update client name,confirm collection, mark as not collected |
            | collected | view                                                                                         |




# Scenario: Offer status

#         Given Offers <status>
#         Then Seler can perform actions

#         |status|action|
#         |drafted|view, update, publish|
#         |started |add order
#         |registration ended|confirm orders

# Feature: Adding orders


# Rule: When seller whants to add order, he should see published, offers, when collection started, and when collection no ended

# Feature: Confirming collection

# Rule: When seller whants to confirm order collection he should see orders which collection started before given date, and which are not collected
# Rule When on offer there is end collection